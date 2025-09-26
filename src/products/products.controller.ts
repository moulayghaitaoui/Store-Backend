import {
  Controller, Get, Post, Body, Param, Query, UseGuards, Req,
  UploadedFile, UseInterceptors, Put, Delete
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

import e from 'express';
import { CreateProductsDto, UpdateProductsDto } from './dto/prodict.dto';


const storage = diskStorage({
  destination: process.env.UPLOAD_PATH || './uploads',
  filename: (req, file, cb) => {
    const name = uuidv4() + extname(file.originalname);
    cb(null, name);
  },
});

@Controller('products')
export class ProductsController {
  constructor(private svc: ProductsService) {}

  @Get()
  getAll(@Query('category') category?: string, @Query('sort') sort?: string) {
    return this.svc.findAll({ category, sort });
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('OWNER')
  @Post()
  @UseInterceptors(FileInterceptor('image', { storage }))
  async create(@UploadedFile() file: Express.Multer.File, @Body() body: CreateProductsDto, @Req() req: any) {
    const imageUrl = file ? `/uploads/${file.filename}` : undefined;
    return this.svc.create({ ...body,image: imageUrl }, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('OWNER')
  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { storage }))
  async update(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Body() body: UpdateProductsDto) {
    const data: any = { ...body };
    if (file) data.imageUrl = `/uploads/${file.filename}`;
    return this.svc.update(id, data);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('OWNER')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}
