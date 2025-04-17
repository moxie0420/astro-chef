import { Collection, BaseItem } from '@signaldb/core';
import type { CollectionOptions } from '@signaldb/core';
import { z } from 'zod';
import type { ZodSchema, infer as ZodInfer } from 'zod';

export const uuid = z.string().uuid();

export const Ingredient = z.object({
  name: z.string(),
  amount: z.object({
    decimal: z.number(),
    fraction: z.string(),
  }),
  unit: z.string(),
});

export type IngredientType = ZodInfer<typeof Ingredient>;

export interface SchemaCollectionOptions<T extends ZodSchema, U = ZodInfer<T>>
  extends CollectionOptions<ZodInfer<T>, string, U> {
  schema: T;
}

export class SchemaCollection<
  T extends ZodSchema<BaseItem<string>>,
  U = ZodInfer<T>,
> extends Collection<ZodInfer<T>, string, U> {
  private schema: T;

  constructor(options: SchemaCollectionOptions<T, U>) {
    super(options);
    this.schema = options.schema;

    // Automatically validate each item against the Zod schema before saving
    this.on('validate', (item) => {
      this.schema.parse(item);
    });
  }
}
