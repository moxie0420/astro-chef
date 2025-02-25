import "reflect-metadata";

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Ingredient } from "./Ingredient";

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn("increment")
  /** @ts-expect-error 2564 */
  id: number;

  @Column({ type: "varchar", default: "Untitled Recipe" })
  /** @ts-expect-error 2564 */
  title: string;

  @Column({ type: "varchar", default: "No one yet" })
  /** @ts-expect-error 2564 */
  author: string;

  @CreateDateColumn()
  /** @ts-expect-error 2564 */
  created: string;

  @UpdateDateColumn()
  /** @ts-expect-error 2564 */
  edited: string;

  @Column({ type: "varchar", default: "Not set yet" })
  /** @ts-expect-error 2564 */
  prepTime: string;

  @Column({ type: "varchar", default: "Not set yet" })
  /** @ts-expect-error 2564 */
  cookTime: string;

  @Column({ type: "text", default: "" })
  /** @ts-expect-error 2564 */
  description: string;

  @Column({ type: "text", default: "" })
  /** @ts-expect-error 2564 */
  body: string;

  @Column({ nullable: true, type: "text" })
  /** @ts-expect-error 2564 */
  image: string;

  @Column({ nullable: true, type: "text" })
  /** @ts-expect-error 2564 */
  imageAlt: string;

  @Column({ type: "boolean", default: false })
  /** @ts-expect-error 2564 */
  liked: boolean;

  @Column({ type: "int", default: 0 })
  /** @ts-expect-error 2564 */
  views: number;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe, {
    cascade: true,
  })
  /** @ts-expect-error 2564 */
  ingredients: Ingredient[];
}
