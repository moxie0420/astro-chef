import "reflect-metadata";
import { type unit, units } from "src/entity/Ingredient/units";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "../Recipe";

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn("increment")
  /** @ts-expect-error 2564 */
  id: number;

  @Column("varchar")
  /** @ts-expect-error 2564 */
  name: string;

  @Column({ type: "enum", enum: units })
  /** @ts-expect-error 2564 */
  unit: unit;

  @Column("float")
  /** @ts-expect-error 2564 */
  whole: number;

  @Column("varchar")
  /** @ts-expect-error 2564 */
  fraction: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  /** @ts-expect-error 2564 */
  recipe: Recipe;
}
