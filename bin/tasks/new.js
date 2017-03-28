import path from 'path';
import fs from 'fs-extra';
import _ from 'lodash';

function newTask(name) {
  const templates = `${path.join(__dirname, '/')}../../lib/templates`;
  const slug = _.replace(_.snakeCase(name), '_', '-');

  fs.copy(templates, slug, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Project initialized!');
      console.log('Now run below commands and start working. Happy coding!');
      console.log(`cd ${slug}`);
      console.log('npm install');
      console.log('handyman run');
    }
  });
}

export default newTask;
