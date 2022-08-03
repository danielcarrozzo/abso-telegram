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
        this.queryRunner(`SELECT * FROM movements`)
    }

    queryRunner =
        async (query) => {
            console.log(query);
            return (await this.postgress.query(query)).rows;
        }

    addUser =
        async (telegramId) => (await this.queryRunner(`INSERT INTO Users(TelegramId)VALUES ('${telegramId}')RETURNING UserId;`))

    isRegisted =
        async TelegramId => (await this.queryRunner(`SELECT UserId
                                                         FROM Users
                                                         WHERE TelegramId='${TelegramId}';`)).length

    addMovement =
        async (userid, ammount, category, comment) => (await this.queryRunner(`INSERT INTO Movements(UserId, MoneyAmmount, Category ${category===''?`, `:``}, Comment ${comment===''?`, `:``})VALUES ('${userid}', '${ammount}', ${category===''?`, `:``}, ${comment===''?`, `:``})RETURNING MovementId;`))

    getUserId =
        async TelegramId => (await this.queryRunner(`SELECT UserId
                                                         FROM Users
                                                         WHERE TelegramId='${TelegramId}';`))[0]

    getUser =
        async UserId => (await this.queryRunner(`SELECT *
                                                FROM Users
                                                WHERE UserId='${UserId}'`))[0];

    getMovement =
        async MovementId => (await this.queryRunner(`SELECT *
                                                FROM Movements
                                                WHERE MovementId='${MovementId}'`))[0];

    getMovementsOfSpecificUser =
        async Category => (await this.queryRunner(`SELECT *
                                                FROM Movements
                                                WHERE Category='${Category}'`));

    getMovementsOfSpecificCategoryAndUser =
        async Category => (await this.queryRunner(`SELECT *
                                                FROM Movements
                                                WHERE Category='${Category}'`));

}

module.exports = DatabaseUtilities;