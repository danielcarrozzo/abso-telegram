//Singleton https://javascript.info/static-properties-methods, https://www.html.it/pag/48316/singleton-pattern-in-javascript/
class DatabaseUtilities {
    static _instance;

    postgress;

    //dbUtilities(){}

    static get INSTANCE() {
        if (!DatabaseUtilities._instance) {
            DatabaseUtilities._instance = new DatabaseUtilities();
        }
        return DatabaseUtilities._instance;
    }

    setConnection(postgress) {
        this.postgress = postgress
    }

    queryRunner =
        async (query) => {
            console.log(query);
            return (await this.postgress.query(query)).rows;
        }

    isRegisted =
        async TelegramId => (await this.queryRunner(`SELECT UserId
                                                         FROM Users
                                                         WHERE TelegramId='${TelegramId}';`)).length

    addMovement =
        async (ammount, comment) => (await this.queryRunner(`INSERT INTO Movements(Ammount, Comment ${comment===''?`, `:``})VALUES ('${ammount}', ${comment===''?`, `:``})RETURNING MovementId;`))

}

module.exports = DatabaseUtilities;