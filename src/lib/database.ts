import { Database } from "bun:sqlite";

type american_s_t = "teaspoon" | "tablespoon" | "cup" | "ounce";
type american_l_t = "fluid cup" | "fluid ounce" | "pint" | "quart" | "gallon";
type grams_t = "kilograms" | "grams" | "miligram" ;

interface Ingredient {
    $type: "Ingredient";
    Recipe: number;
    Id: number;
    Name: string;
    Amount: number;
    Unit: grams_t | american_l_t | american_s_t;
};

interface Recipe {
    $type: "Recipe";
    Id: number;
    Title: string;
    Body: string;
    Ingredients?: Array<number>;
    PrepTime: number;
    CookTime: number
};

class DB {
    private db: Database;
    /**
     * Creates a Database Object that handles CRUD
     * @param {string} path - path to the database file
     */
    constructor(path?: string) {
        this.db = new Database(path || process.env.DATABASE_PATH || "./database.db", { strict: true });
        
    }

    private seed() {
        this.db.query("CREATE TABLE Recipes (Id INT NOT NULL UNIQUE AUTO_INCREMENT, Title TEXT, Body TEXT, Ingredients INT,PrepTime INT, CookTime, INT)").get();
        this.db.query("CREATE TABLE Ingredients (Id INT NOT NULL PRIMARY KEY UNIQUE, Recipe INT, Name TEXT, Amount DOUBLE, Unit TEXT)").get();
    }

    public create(data: Recipe | Ingredient, ) {
        if ( data.$type === "Recipe" ) {
            const insert = this.db.query("INSERT INTO Recipes; VALUES (" +)

        }
        
    }

    public read() {
        
    }

    public update() {
        
    }

    public destroy() {
        
    }

}

export type {Ingredient, Recipe, grams_t, american_l_t, american_s_t};
export default DB;