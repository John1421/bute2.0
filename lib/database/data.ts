import { sql } from '@vercel/postgres';
import { Song, Artist, Tag } from './definitions';

const ITEMS_PER_PAGE = 6;