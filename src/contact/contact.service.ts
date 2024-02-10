import { ConflictException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateContactDto } from "./dto/create-contact.dto"
import { QueryContactParamsDto } from "./dto/query-contact-params.dto"
import { UpdateContactDto } from "./dto/update-contact.dto"
import { Contact } from "./contact.entity"

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>
  ) { }


  async create(dto: CreateContactDto): Promise<Contact> {
    this.isUnique(dto.nickname)
    const contact = this.contactRepository.create(dto);
    return await this.contactRepository.save(contact);
  }

  async getAll(dto: QueryContactParamsDto) {
    const { page = 1, limit = 4 } = dto;
    try {
      const [contacts, totalCount] = await this.contactRepository.findAndCount({
        relations: {},
        order: {
          createdAt: 'DESC',
        },
        take: limit,
        skip: (page - 1) * limit,
      });

      return { totalCount, contacts };
    } catch (e) {
      return { totalCount: 0, contacts: [] }
    }
  }

  async findOne(id: number): Promise<Contact> {
    const contact = await this.contactRepository.findOne({
      where: { id },
      relations: {},
    })

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`)
    }

    return contact
  }

  async editContact(contactId: number, dto: UpdateContactDto) {
    const contact = await this.findOne(contactId);

    if (dto.nickname) await this.isUnique(dto.nickname);

    Object.assign(contact, dto);

    const updatedContact = await this.contactRepository.save(contact);
    return updatedContact;
  }


  async remove(id: number) {
    const contact = await this.findOne(id);

    return this.contactRepository.remove(contact)
  }

  private async isUnique(value: string) {
    const existingContact = await this.contactRepository.findOne({
      where: { nickname: value },
    });

    if (existingContact) {
      throw new ConflictException(`Contact with nickname '${value}' already exists`);
    }
  }
}
