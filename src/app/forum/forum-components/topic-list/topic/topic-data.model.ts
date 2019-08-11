import { SortOption } from '../../topic-sorter/sort-option.model';
import { Tag } from '../../../../shared/ui-components/tag/tag.model';

export interface Topic {
    title: string;
    author: string;
    date: string;
    tags: Tag[];
}

export interface TopicSummary extends Topic {
    posts: number;
    views: number;
    lastPostAuthor: string;
    lastPostDate: string;
}

export interface TopicFilterOptions {
    title: string;
    sortTerm: SortOption;
    tags: Tag[];
}
