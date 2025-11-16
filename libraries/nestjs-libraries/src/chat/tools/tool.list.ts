import { IntegrationValidationTool } from '@boto/nestjs-libraries/chat/tools/integration.validation.tool';
import { IntegrationTriggerTool } from '@boto/nestjs-libraries/chat/tools/integration.trigger.tool';
import { IntegrationSchedulePostTool } from './integration.schedule.post';
import { GenerateVideoOptionsTool } from '@boto/nestjs-libraries/chat/tools/generate.video.options.tool';
import { VideoFunctionTool } from '@boto/nestjs-libraries/chat/tools/video.function.tool';
import { GenerateVideoTool } from '@boto/nestjs-libraries/chat/tools/generate.video.tool';
import { GenerateImageTool } from '@boto/nestjs-libraries/chat/tools/generate.image.tool';
import { IntegrationListTool } from '@boto/nestjs-libraries/chat/tools/integration.list.tool';

export const toolList = [
  IntegrationListTool,
  IntegrationValidationTool,
  IntegrationTriggerTool,
  IntegrationSchedulePostTool,
  GenerateVideoOptionsTool,
  VideoFunctionTool,
  GenerateVideoTool,
  GenerateImageTool,
];
