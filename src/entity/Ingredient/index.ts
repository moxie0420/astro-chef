import "reflect-metadata";
import { type unit, units } from "src/entity/Ingredient/units";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Recipe } from "../Recipe";

@Entity()
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar")
  name: string;

  @Column({ type: "enum", enum: units })
  unit: unit;

  @Column("float")
  whole: number;

  @Column("varchar")
  fraction: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  recipe: Recipe;
}
