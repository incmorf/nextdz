const fs = require('fs');
const path = require('path');


exports.add = ({ name, email, message }) => new Promise(async (resolve, reject) => {
    try {
        
        

        if(!name || !email || !message) {
            reject('All fields are required');
            return;
        }
        let result = `Имя пользоватеья: ${name}, Емейл: ${email}, Сообщение: ${message}`;
        //Отправка письма
        resolve(result);
       

        
    }
    catch (err) {
        reject(err);
    }

});