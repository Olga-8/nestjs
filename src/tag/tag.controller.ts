import { Controller, Get } from "@nestjs/common";
import { TagService } from './tag.service';
import { TagEntity } from './tag.entity';

@Controller('tags')
export class TagController {
    constructor(private tagService: TagService) {}
    
    @Get()
    async getTags(): Promise<{tags: string[]}> {
        const tags = await this.tagService.getTags();
            return {
                tags: tags.map(tag => tag.name)
            };
    }
}
