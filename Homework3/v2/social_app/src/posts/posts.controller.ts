// Old code:

// // // import { Controller } from '@nestjs/common';

// // // @Controller('posts')
// // // export class PostsController {}




// // import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
// // import { PostsService, Post } from './posts.service';

// // @Controller('posts')
// // export class PostsController {
// //   constructor(
// //     private postsService: PostsService

// // ) { }

// //   @Post()
// //   create(@Body() createPostDto: { title: string; content: string; authorId: number }): Post {
// //     // Validate title and content length
// //     if (createPostDto.title.length < 3) {
// //       throw new Error('Title must be at least 3 characters long');
// //     }
// //     if (createPostDto.content.length < 10) {
// //       throw new Error('Content must be at least 10 characters long');
// //     }
// //     return this.postsService.create(createPostDto.title, createPostDto.content, createPostDto.authorId);
// //   }

// //   @Get()
// //   findAll(): Post[] {
// //     return this.postsService.findAll();
// //   }

// //   @Get(':id')
// //   findOne(@Param('id') id: number): Post {
// //     return this.postsService.findOne(id);
// //   }

// //   @Put(':id')
// //   update(@Param('id') id: number, @Body() updatePostDto: { title: string; content: string; authorId: number }): Post {
// //     // Validate title and content length
// //     if (updatePostDto.title.length < 3) {
// //       throw new Error('Title must be at least 3 characters long');
// //     }
// //     if (updatePostDto.content.length < 10) {
// //       throw new Error('Content must be at least 10 characters long');
// //     }
// //     return this.postsService.update(id, updatePostDto.title, updatePostDto.content, updatePostDto.authorId);
// //   }

// //   @Delete(':id')
// //   remove(@Param('id') id: number): void {
// //     this.postsService.remove(id);
// //   }

// //   @Get('user/:authorId')
// //   findPostsByUserId(@Param('authorId') authorId: number): Post[] {
// //     return this.postsService.findPostsByUserId(authorId);
// //   }
// // }






// // import {
// //     Controller,
// //     Get,
// //     Post,
// //     Body,
// //     Param,
// //     Put,
// //     Delete,
// //     BadRequestException,
// //     NotFoundException,
// // } from '@nestjs/common';
// // import { PostsService, Post as PostEntity } from './posts.service';
// // import { UsersService } from '../users/users.service';
// // import { Response } from 'express';
// // import { CommonService } from 'src/common/common.service';
// // import { v4 as uuidv4 } from 'uuid';
// // const id = uuidv4();


// // @Controller('posts')
// // export class PostsController {
// //     constructor(private readonly postsService: PostsService) { }

// //     @Post()
// //     create(
// //         @Body()
// //         body: { title?: string; content?: string; authorId?: string },
// //     ): PostEntity {
// //         const { title, content, authorId } = body;

// //         // Manual validation
// //         if (!title || title.length < 3) {
// //             throw new BadRequestException('Title must be at least 3 characters long');
// //         }
// //         if (!content || content.length < 10) {
// //             throw new BadRequestException('Content must be at least 10 characters long');
// //         }
// //         if (authorId === undefined || authorId === null) {
// //             throw new BadRequestException('authorId is required');
// //         }
// //         if (!this.postsService.isAuthorExists(authorId)) {
// //             throw new BadRequestException(`Author with id ${authorId} does not exist`);
// //         }

// //         return this.postsService.create(title, content, authorId);
// //     }

// //     @Get()
// //     findAll(): PostEntity[] {
// //         return this.postsService.findAll();
// //     }

// //     // @Get(':id')
// //     // findOne(@Param('id') id: string): PostEntity {
// //     //     const postId = id;
// //     //     //   if (isNaN(postId)) {
// //     //     //     throw new BadRequestException('Post ID must be a number');
// //     //     //   }

// //     //     const post = this.postsService.findOne(postId);
// //     //     if (!post) {
// //     //         throw new NotFoundException(`Post with id ${postId} not found`);
// //     //     }
// //     //     return post;
// //     // }

// //     @Get(':id')
// //     findOne(@Param('id') id: string): PostEntity {
// //         // id is UUID string, no conversion needed
// //         return this.postsService.findOne(id);
// //     }

// //     @Put(':id')
// //     update(
// //         @Param('id') id: string,
// //         @Body()
// //         body: { title?: string; content?: string; authorId?: string },
// //     ): PostEntity {
// //         const postId = Number(id);
// //         if (isNaN(postId)) {
// //             throw new BadRequestException('Post ID must be a number');
// //         }

// //         const { title, content, authorId } = body;

// //         if (!title || title.length < 3) {
// //             throw new BadRequestException('Title must be at least 3 characters long');
// //         }
// //         if (!content || content.length < 10) {
// //             throw new BadRequestException('Content must be at least 10 characters long');
// //         }
// //         if (authorId === undefined || authorId === null) {
// //             throw new BadRequestException('authorId is required');
// //         }
// //         if (!this.postsService.isAuthorExists(authorId)) {
// //             throw new BadRequestException(`Author with id ${authorId} does not exist`);
// //         }

// //         const updatedPost = this.postsService.update(postId, title, content, authorId);
// //         if (!updatedPost) {
// //             throw new NotFoundException(`Post with id ${postId} not found`);
// //         }
// //         return updatedPost;
// //     }

// //     @Delete(':id')
// //     remove(@Param('id') id: string): void {
// //         const postId = Number(id);
// //         if (isNaN(postId)) {
// //             throw new BadRequestException('Post ID must be a number');
// //         }

// //         const deleted = this.postsService.remove(postId);
// //         if (!deleted) {
// //             throw new NotFoundException(`Post with id ${postId} not found`);
// //         }
// //     }

// //     @Get('user/:authorId')
// //     findPostsByUserId(@Param('authorId') authorId: string): PostEntity[] {
// //         const userId = Number(authorId);
// //         if (isNaN(userId)) {
// //             throw new BadRequestException('Author ID must be a number');
// //         }
// //         return this.postsService.findPostsByUserId(userId);
// //     }
// // }






// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Res,
//   Param,
//   Put,
//   Delete,
//   BadRequestException,
//   NotFoundException,
// } from '@nestjs/common';
// import { PostsService, Post as PostEntity } from './posts.service';
// import { Response } from 'express';

// @Controller('posts')
// export class PostsController {
//   constructor(private readonly postsService: PostsService) { }

//   @Post()
//   create(
//     @Body()
//     body: { title?: string; content?: string; authorId?: string },
//   ): PostEntity {
//     const { title, content, authorId } = body;

//     // Manual validation
//     if (!title || title.length < 3) {
//       throw new BadRequestException('Title must be at least 3 characters long');
//     }
//     if (!content || content.length < 10) {
//       throw new BadRequestException('Content must be at least 10 characters long');
//     }
//     if (!authorId) {
//       throw new BadRequestException('authorId is required');
//     }
//     if (!this.postsService.isAuthorExists(authorId)) {
//       throw new BadRequestException(`Author with id ${authorId} does not exist`);
//     }

//     return this.postsService.create(title, content, authorId);
//   }

//   @Get()
//   findAll(): PostEntity[] {
//     return this.postsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string): PostEntity {
//     // id is UUID string, no conversion needed
//     // const post = this.postsService.findOne(id);
//     // if (!post) {
//     //   throw new NotFoundException(`Post with id ${id} not found`);
//     // }
//     // return post;

//     return this.postsService.findOne(id);
//   }

//   @Put(':id')
//   update(
//     @Param('id') id: string,
//     @Body() body: any,
//     //   body: { title?: string; content?: string; authorId?: string },
//     @Res() response: Response,
//   ): PostEntity {
//     const { title, content, authorId } = body;

//     if (!title || title.length < 3) {
//       throw new BadRequestException('Title must be at least 3 characters long');
//     }
//     if (!content || content.length < 10) {
//       throw new BadRequestException('Content must be at least 10 characters long');
//     }
//     if (!authorId) {
//       throw new BadRequestException('authorId is required');
//     }
//     if (!this.postsService.isAuthorExists(authorId)) {
//       throw new BadRequestException(`Author with id ${authorId} does not exist`);
//     }

//     const updatedPost = this.postsService.update(id, title, content, authorId);
//     if (!updatedPost) {
//       throw new NotFoundException(`Post with id ${id} not found`);
//     }
//     return updatedPost;
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string): void {
//     this.postsService.remove(id);

//     //   const deleted = this.postsService.remove(id);
//     //   if (!deleted) {
//     //     throw new NotFoundException(`Post with id ${id} not found`);
//     //   }
//   }

//   // @Get('user/:authorId')
//   // findPostsByUserId(@Param('authorId') authorId: string): PostEntity[] {
//   //   if (!authorId) {
//   //     throw new BadRequestException('Author ID is required');
//   //   }
//   //   return this.postsService.findPostsByUserId(authorId);
//   // }
// }



// Improved code:

import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException } from '@nestjs/common';
import { PostsService, Post as PostEntity } from './posts.service';

// Helper for validation
function validatePostInput({ title, content, authorId }) {
  if (!title || title.length < 3) throw new BadRequestException('Title must be at least 3 characters long');
  if (!content || content.length < 10) throw new BadRequestException('Content must be at least 10 characters long');
  if (!authorId) throw new BadRequestException('authorId is required');
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  create(@Body() body: { title: string; content: string; authorId: string }): PostEntity {
    validatePostInput(body);
    return this.postsService.create(body.title, body.content, body.authorId);
  }

  @Get()
  findAll(): PostEntity[] {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): PostEntity {
    return this.postsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { title: string; content: string; authorId: string }): PostEntity {
    validatePostInput(body);
    return this.postsService.update(id, body.title, body.content, body.authorId);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.postsService.remove(id);
  }

  @Get('user/:authorId')
  findPostsByUserId(@Param('authorId') authorId: string): PostEntity[] {
    if (!authorId) throw new BadRequestException('Author ID is required');
    return this.postsService.findPostsByUserId(authorId);
  }
}
