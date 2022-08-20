// milestone 3
// This function updates status of tasks as they clicked

export default function taskStatus(target) {
  const tempList = JSON.parse(localStorage.getItem('my-to-do-list'));
  for (let i = 0; i < tempList.length; i += 1) {
    const cbTemp = target.parentElement.lastElementChild.innerHTML;
    if ((tempList[i].description.trim().toString()) === (cbTemp.trim().toString())) {
      if (target.checked) {
        tempList[i].completed = true;
      } else {
        tempList[i].completed = false;
      }
      localStorage.setItem('my-to-do-list', JSON.stringify(tempList));
    }
  }
}