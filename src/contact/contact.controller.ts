import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryContactParamsDto } from './dto/query-contact-params.dto';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) { }

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 4 })
  getAll(@Query() params: QueryContactParamsDto) {
    return this.contactService.getAll(params);

  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID of the contact' })
  getOne(@Param('id') id: number) {
    return this.contactService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') contactId: number,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return await this.contactService.editContact(contactId, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
