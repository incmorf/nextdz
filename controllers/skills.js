const fs = require('fs');
const path = require('path');
const skillsPath = path.join(__dirname, '../temp/skills.json');

exports.get = () => new Promise(async (resolve, reject) => {
    try {
      let skills = [];   
      
      if (fs.existsSync(skillsPath)) {
        skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));
      }
      resolve(skills);
    } catch (err) {
      reject(err);
    }
  });

  exports.add = ({age, concerts, cities, years}) => new Promise(async (resolve, reject) => {
    try {
      
      let skills = [];
      if (fs.existsSync(skillsPath)) {
        skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));
      }
      skills.age.number = age;
      skills.concerts.number = concerts;
      skills.cities.number = cities;
      skills.years.number = years;
      console.log(skills);
      
      fs.writeFileSync(path.join(process.cwd(), '/temp/skills.json'), JSON.stringify(skills));
      resolve(true);
    }
    catch(err) {
      reject(err);
    }
    
  });