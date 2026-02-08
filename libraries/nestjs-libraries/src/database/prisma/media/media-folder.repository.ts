import {
  PrismaRepository,
  PrismaService,
} from '@gitroom/nestjs-libraries/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MediaFolderRepository {
  constructor(
    private _mediaFolder: PrismaRepository<'mediaFolder'>,
    private _prisma: PrismaService
  ) {}

  getChildren(org: string, parentId: string | null) {
    return this._mediaFolder.model.mediaFolder.findMany({
      where: {
        organizationId: org,
        parentId,
        deletedAt: null,
      },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        color: true,
        parentId: true,
        createdAt: true,
      },
    });
  }

  async getFolderTree(org: string) {
    const all = await this._mediaFolder.model.mediaFolder.findMany({
      where: {
        organizationId: org,
        deletedAt: null,
      },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        parentId: true,
      },
    });

    const buildTree = (parentId: string | null): typeof all => {
      return all
        .filter((f) => f.parentId === parentId)
        .map((f) => ({
          ...f,
          children: buildTree(f.id),
        }));
    };

    return buildTree(null);
  }

  createFolder(org: string, name: string, parentId: string | null, color?: string) {
    return this._mediaFolder.model.mediaFolder.create({
      data: {
        organizationId: org,
        name,
        parentId,
        ...(color && { color }),
      },
      select: {
        id: true,
        name: true,
        color: true,
        parentId: true,
        createdAt: true,
      },
    });
  }

  renameFolder(org: string, id: string, name: string) {
    return this._mediaFolder.model.mediaFolder.update({
      where: {
        id,
        organizationId: org,
      },
      data: { name },
      select: {
        id: true,
        name: true,
        parentId: true,
      },
    });
  }

  async deleteFolder(org: string, id: string) {
    const folder = await this._mediaFolder.model.mediaFolder.findUnique({
      where: { id, organizationId: org },
    });
    if (!folder) return null;

    const parentId = folder.parentId;

    await this._prisma.$transaction([
      this._prisma.mediaFolder.updateMany({
        where: { parentId: id, organizationId: org },
        data: { parentId },
      }),
      this._prisma.media.updateMany({
        where: { folderId: id, organizationId: org },
        data: { folderId: parentId },
      }),
      this._prisma.mediaFolder.update({
        where: { id, organizationId: org },
        data: { deletedAt: new Date() },
      }),
    ]);

    return { id };
  }

  async moveFolder(org: string, id: string, newParentId: string | null) {
    const folder = await this._mediaFolder.model.mediaFolder.findUnique({
      where: { id, organizationId: org },
    });
    if (!folder) return null;

    if (newParentId) {
      const wouldCreateCycle = await this.isDescendant(org, newParentId, id);
      if (wouldCreateCycle) {
        throw new Error('Cannot move folder into its own descendant');
      }
    }

    return this._mediaFolder.model.mediaFolder.update({
      where: { id, organizationId: org },
      data: { parentId: newParentId },
      select: {
        id: true,
        name: true,
        parentId: true,
      },
    });
  }

  private async isDescendant(
    org: string,
    folderId: string,
    ancestorId: string
  ): Promise<boolean> {
    if (folderId === ancestorId) return true;
    const folder = await this._mediaFolder.model.mediaFolder.findUnique({
      where: { id: folderId, organizationId: org },
    });
    if (!folder?.parentId) return false;
    return this.isDescendant(org, folder.parentId, ancestorId);
  }

  async getFolderPath(org: string, folderId: string | null) {
    if (!folderId) return [];
    const path: { id: string; name: string }[] = [];
    let currentId: string | null = folderId;

    while (currentId) {
      const folder = await this._mediaFolder.model.mediaFolder.findUnique({
        where: { id: currentId, organizationId: org, deletedAt: null },
      });
      if (!folder) break;
      path.unshift({ id: folder.id, name: folder.name });
      currentId = folder.parentId;
    }

    return path;
  }

  getFolderById(org: string, id: string) {
    return this._mediaFolder.model.mediaFolder.findUnique({
      where: { id, organizationId: org, deletedAt: null },
    });
  }
}
