//Singleton https://javascript.info/static-properties-methods, https://www.html.it/pag/48316/singleton-pattern-in-javascript/
class TelegramInterfaceUtilities {
    static _instance;

    client;

    //dbUtilities(){}

    static get INSTANCE() {
        if (!TelegramInterfaceUtilities._instance) {
            TelegramInterfaceUtilities._instance = new TelegramInterfaceUtilities();
        }
        return TelegramInterfaceUtilities._instance;
    }

    setClient = client => this.client = client;
}

module.exports = TelegramInterfaceUtilities;