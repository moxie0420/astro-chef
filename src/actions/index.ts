import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';

import { recipe } from './recipe';

export const server = {
    recipe
}