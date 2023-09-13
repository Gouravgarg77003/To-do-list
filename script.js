const addtask = () => {
    const jsonobj = {
        time: document.getElementById("time").value,
        desc: document.getElementById("desc").value,
        value:"Active"
    };
    localStorage.setItem(document.getElementById("name").value,JSON.stringify(jsonobj))
    document.getElementById("desc").value=''
    document.getElementById("time").value=''
    document.getElementById("name").value=''
    getAllDataFromLocalStorage(true);
};


const remove=(ele)=>{
    localStorage.removeItem(ele)
    getAllDataFromLocalStorage(true);
}



const getAllDataFromLocalStorage = (koko) => {
    if(document.getElementById('list').childElementCount===localStorage.length && !koko){
        return;
    }else{
        document.getElementById('list').innerHTML="";
    }
    const allData = [];
  
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      allData.push({ key, value });
    }
    function createListItem(itemName, time, description, status) {
        const li = document.createElement('li');
        li.innerHTML = `
          <div class="px-4 py-5 sm:px-6">
            <div class="flex items-center justify-between">
              <h3 class="text-lg leading-6 font-medium text-gray-900">${itemName}</h3>
              <h4 class="text-md leading-6 font-medium font-bold text-gray-900">${time}</h4>
            </div>
            <div class="flex items-center justify-between">
              <p class="mt-1 max-w-2xl text-sm text-gray-500">${description}</p>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-sm font-medium text-gray-500">Status: <span class="text-pink-600" onclick="changeState('${itemName}')">${status}</span></p>
              <a class="font-medium text-indigo-600 hover:text-indigo-500" onclick="Edit('${itemName}')">Edit</a>
              <a class="font-medium text-indigo-600 hover:text-indigo-500 " onclick="remove('${itemName}')">Delete</a>
            </div>
          </div>
        `;
        return li;
      }
      
      // Example usage:
      allData.map((item)=>{
        const value= JSON.parse(item.value);
        const newItem = createListItem(item.key,value.time,value.desc, value.value);
        const listContainer = document.getElementById('list'); // Assuming you have an element with the id "list" to append to
        listContainer.appendChild(newItem);
      })
      
    return allData;
  };
  const changeState=(ele)=>{
    const val=JSON.parse(localStorage.getItem(ele));
    val.value="Not Active"
    localStorage.setItem(ele,JSON.stringify(val));
    
    getAllDataFromLocalStorage(true);
  }

  const Edit=(ele)=>{
    const val=JSON.parse(localStorage.getItem(ele))
    document.getElementById("name").value=ele;
    document.getElementById("time").value=val.time;
    document.getElementById("desc").value=val.desc;
  }