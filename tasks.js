
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
var Tasks = {"list":[]};

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
  else if(texts==='edit'){
    var EditTask = text.substring(4).trim();
    edit(EditTask);
  }
  else if (texts === 'check'){
    var toBeChecked = text.substring(5).trim();
    check(toBeChecked);
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
//function if i add a string after hello it will display it "hello + string entered"
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
  for(let i=0;i<Tasks.list.length;i++){ // loop to iterate over tasks list
    if(Tasks.list[i].status == false){
      console.log(i+1 + "[ ]" + Tasks.list[i].name);
    }else{console.log(i+1 + "[✓]" + Tasks.list[i].name);}
  }
  
}

// function to handle task adding
function add(task){
  if(task == "" || task == " "){ //if there is a space or only the add is entered without the task it will throw an error
    console.log('you must enter a task');
    return;
  }
  else{
    Tasks.list.push({name:task,status:false}); //it will add the task with status unchecked as default
    console.log("list of task ",Tasks.list)
    console.log('task: '+ task + ' Task Added');
  }
  
}

function remove(taskNo){ //remove function to handle task removal
  
  console.log(taskNo);
  if(taskNo == "" || taskNo == " "){ // if there is empty task it no will be assigned to zero
    taskNo = 0;
    console.log(taskNo+ 'last task removed');
  }
  else if(taskNo > Tasks.length){ // if a task number is invalid it will throw an error and cannot be removed
    console.log("ERROR: task number doesn't exist");}
  else {
    console.log('task removed');
}
Tasks.splice(taskNo-1,1)
}

//function to handle tasks editing
function edit(taskNo){
  if (taskNo == "" || taskNo ==" "){
    console.log("ERROR: you should specify a task")
  }
  else if (isNaN(taskNo[0])){ // if you are adding a NEW TEXT(NOT A NUMBER) next to the edit word the task will be added
    (Tasks[Tasks.length-1] = taskNo)
    // console.log("ERROR: you should specify a number")
  }

  else{
    (Tasks[taskNo][0]-1 === taskNo.substring(1).trim())// adding a task number to edit
  }
  console.log(taskNo)// 1 drink coffee
  console.log(taskNo[0]) // 1
  console.log(Tasks[taskNo[0]-1]) // the item at index 1-1 => 0
  console.log(taskNo.substring(1).trim())// this will give  u everything after the number => drink coffee
  
}

//function to check/uncheck tasks
function check(num){
  if(num == "" || num == " "){ //if number of task to be checked not written
    console.log("ERROR: enter a number to check");
  }
  else if(num > Tasks.list.length){// if number of task to be checked not available
    console.log("ERROR: task number invalid");
  }
  else{
    if(Tasks.list[num-1].status == false){ // assign it to true when its checked
      Tasks.list[num-1].status = true;
    }
    else{
      Tasks.list[num-1].status = false;// assign it to false when its unchecked
    }

  }console.log(Tasks.list)
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
  console.log('check + number of task---It will mark the task as done');
  console.log('re-check + number of task---It will mark the task as undone');
}

// The following line starts the application
startApp("Muhieddine")
