const sessions = new Map();

function set(numero, dados) {

    sessions.set(
        numero,
        {
            ...dados,
            atualizadoEm: new Date().toISOString()
        }
    );

}


function get(numero) {

    return sessions.get(numero);

}


function clear(numero) {

    sessions.delete(numero);

}


module.exports = {

    set,

    get,

    clear

};
