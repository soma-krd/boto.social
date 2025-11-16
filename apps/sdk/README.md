# Boto NodeJS SDK

This is the NodeJS SDK for [Boto](https://boto.social).

You can start by installing the package:

```bash
npm install @boto/node
```

## Usage
```typescript
import Boto from '@boto/node';
const boto = new Boto('your api key', 'your self-hosted instance (optional)');
```

The available methods are:
- `post(posts: CreatePostDto)` - Schedule a post to Boto
- `postList(filters: GetPostsDto)` - Get a list of posts
- `upload(file: Buffer, extension: string)` - Upload a file to Boto
- `integrations()` - Get a list of connected channels
- `deletePost(id: string)` - Delete a post by ID

Alternatively you can use the SDK with curl, check the [Boto API documentation](https://docs.boto.social/public-api) for more information.