
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
var Tasks = [];

function onDataReceived(text) {
  const texts= text.split(" ")[0].trim();
  if (text === 'quit\n' || text ==='exit\n') {
    quit();
  }
  else if (text.startsWith('hello ')) {
    const words = text.trim().substring(6); // Extend text after "hello"
    hello(words);
  }
  else if(text === 'hello\n'){
    hello();
  }
  else if (text ==='help\n'){
    help() 
  }
  else if (texts==='add'){
    var addedTasks = text.substring(3).trim();
    add(addedTasks);
  }
  else if (text==='list\n'){
    list();
  }
  else if(texts==='remove'){
    const RemovedTask = text.substring(6).trim();
    remove(RemovedTask);
  }
  else{
    unknownCommand(text);
  }
 
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
*
* @param  {string} c the text received
* @returns {void}
*/
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
*
* @returns {void}
*/

function hello(myName){
  if (myName) {
    console.log(`hello ${myName}!`);
  } else {
    console.log('hello!');
  }
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// tasks listing
function list(){
  for(let i=0;i<Tasks.length;i++){
    console.log(i + 1 + "[ ] " + Tasks[i])
  }
  // console.log('1 - [ ] buy bread\n 2 - [ ] do the exercises');
  
}
// function to handle task adding
function add(task){
  if(task == "" || task == " "){
    console.log('you must enter a task')
  }
  else{
    Tasks.push(task);
    console.log('task added')
  }
  
}


function remove(taskNo){ //remove function to handle task removal
  
  console.log(taskNo);
  if(taskNo == "" || taskNo == " "){ // if there is empty task it no will be assigned to zero
    taskNo = 0;
    console.log(taskNo+ 'last task removed');
  }
  else {
    console.log('task removed');
}
Tasks.splice(taskNo-1,1)
}

//help function
// this function will execute when typing help and will print all these console.log to help you choose the option that you want

function help() {
  console.log('help---print all commands');
  console.log('hello---say hello');
  console.log('quit---exit the application');
  console.log('exit---act like quit');
  console.log('hello + text ---says hello + text');
  console.log('remove---It will remove the last added task');
  console.log('remove + no of task---It will remove the specified task'); 
}

// The following line starts the application
startApp("Muhieddine")
