import "reflect-metadata";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Ingredient } from "../Ingredient";

@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", default: "Untitled Recipe" })
  title: string;

  @Column({ type: "varchar", default: "No one yet" })
  author: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  edited: Date;

  @Column({ type: "varchar", default: "Not set yet" })
  prepTime: string;

  @Column({ type: "varchar", default: "Not set yet" })
  cookTime: string;

  @Column({ type: "text", default: "" })
  description: string;

  @Column({ type: "text", default: "" })
  body: string;

  @Column({ nullable: true, type: "text", default: "default.png" })
  image: string;

  @Column({ nullable: true, type: "text" })
  imageAlt: string;

  @Column({ type: "boolean", default: false })
  liked: boolean;

  @Column({ type: "int", default: 0 })
  views: number;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe)
  ingredients: Ingredient[];
}
