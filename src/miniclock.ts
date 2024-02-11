
async function getTimezones(){
    const myapi = '/api/timezones';
    const response = await fetch(myapi);
    const data = await response.json();
    return data;
}


document.addEventListener('DOMContentLoaded', (event) => {
    function getMyTz(data: any){
        let myTz = data;
    
        let datalist = document.getElementById('location-datalist') as HTMLDataListElement;
        
        for (let i = 0; i < myTz.length; i++){
            let option = document.createElement('option');
            option.value = myTz[i];
            datalist.appendChild(option);
        }
        let addBtn = document.getElementById('add') as HTMLInputElement;
        let locationInput = document.getElementById('add-location') as HTMLInputElement;
        
        addBtn.addEventListener('click', () => {
            let selectedOption = locationInput.value;
            console.log(selectedOption); 
        
            if (selectedOption !== '') {
                let ul = document.getElementById('location-list') as HTMLUListElement; 
                let li = document.createElement('li');
                li.className = 'list-group';
            
                // Generate a unique id for the list item
                let id = Date.now().toString();
            
                // Store the id in the list item
                li.setAttribute('data-id', id);
            
                let p = document.createElement('p');
                p.className = 'li-time'
                
                let location = document.createElement('p');
                location.className = 'li-location';
                location.textContent = selectedOption;

    
                
                let delateBtn = document.createElement('button');
                delateBtn.className = 'btn';
                delateBtn.textContent = 'X';


                
                
                delateBtn.addEventListener('click', () => {
                    ul.removeChild(li);
                
                    // Remove the list item from local storage
                    let listItems = JSON.parse(localStorage.getItem('listItems') || '[]');
                    let index = listItems.findIndex((item: { id: string; }) => item.id === id);
                    if (index !== -1) {
                        listItems.splice(index, 1);
                        localStorage.setItem('listItems', JSON.stringify(listItems));
                    }
                });

                li.appendChild(p);
                li.appendChild(location);
                li.appendChild(delateBtn);
                ul.appendChild(li);
                
                let listItems = JSON.parse(localStorage.getItem('listItems') || '[]');
                listItems.push({id: id, html: li.outerHTML});
                localStorage.setItem('listItems', JSON.stringify(listItems));
                
                setInterval(() => {
                    p.textContent = createMiniClock({value: selectedOption});
                }, 1000);
        
                locationInput.value = '';
            }
        });

 // Replace the existing code here
 let ul = document.getElementById('location-list') as HTMLUListElement;
 let listItems = JSON.parse(localStorage.getItem('listItems') || '[]');
 for (let item of listItems) {
     let div = document.createElement('div');
     div.innerHTML = item.html;
     let li = div.firstChild as HTMLLIElement;
     ul.appendChild(li);
 }
        
        let lis = ul.getElementsByClassName('list-group');
        for (let i = 0; i < lis.length; i++) {
            let li = lis[i] as HTMLLIElement;
            let p = li.getElementsByClassName('li-time')[0];
            let selectedOption = li.getElementsByClassName('li-location')[0].textContent;

            let intervalId = setInterval(() => {
                p.textContent = createMiniClock({value: selectedOption});
            }, 1000);
        
            let delateBtn = li.getElementsByClassName('btn')[0];
            delateBtn.addEventListener('click', () => {
                ul.removeChild(li);
            
                // Remove the list item from local storage
                let listItems = JSON.parse(localStorage.getItem('listItems') || '[]');
                let id = li.getAttribute('data-id');
                let index = listItems.findIndex((item: { id: string; }) => item.id === id);
                if (index !== -1) {
                    listItems.splice(index, 1);
                    localStorage.setItem('listItems', JSON.stringify(listItems));
                }
            });
        }

    }
    getTimezones().then(getMyTz); 
});





function createMiniClock(locationInput: any): string {
    let timeZone = locationInput.value;
    if (timeZone) {
        let times = new Date();
        let options: Intl.DateTimeFormatOptions = { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false, 
            timeZone: timeZone 
        };
        let formatter = new Intl.DateTimeFormat('en-US', options);
        let formattedTime = formatter.format(times);
        return formattedTime;
    }
    return '';
}