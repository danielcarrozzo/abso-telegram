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
        async (userid, amount, category, comment) => (await this.queryRunner(`INSERT INTO Movements(UserId, Moneyamount ${category===null?`, Category`:``} ${comment===null?`, Comment`:``})
                                                                                    VALUES ('${userid}', '${amount}', ${category===null?`null`:`'${category}'`}, ${comment===null?`null`:`${comment}`})
                                                                                    RETURNING MovementId;`))

    getUserId =
        async TelegramId => (await this.queryRunner(`SELECT UserId
                                                         FROM Users
                                                         WHERE TelegramId='${TelegramId}';`))[0].userid

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