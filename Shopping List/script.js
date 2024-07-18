document.addEventListener("DOMContentLoaded", () => {
    
    let shoppingList = JSON.parse(localStorage.getItem('SHOPPING_LIST')) || [];

    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const shoppingListContainer = document.getElementById('shopping-list'); // Corrected ID
    const clearButton = document.getElementById('clear-button');

    function renderList() {
        shoppingListContainer.innerHTML = '';

        shoppingList.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item.text;
            li.classList.toggle('purchase', item.purchased);

            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('item-actions');

            const toggleButton = document.createElement('button');
            toggleButton.textContent = item.purchased ? 'Unmark' : 'Mark';
            toggleButton.addEventListener('click', () => togglePurchased(index));
            actionsDiv.appendChild(toggleButton);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit'; // Example edit button
            editButton.addEventListener('click', () => editItem(index)); // Add edit logic here
            actionsDiv.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteItem(index));
            actionsDiv.appendChild(deleteButton);

            li.appendChild(actionsDiv);
            shoppingListContainer.appendChild(li);
        });
    }

    function togglePurchased(index) {
        shoppingList[index].purchased = !shoppingList[index].purchased;
        localStorage.setItem('SHOPPING_LIST', JSON.stringify(shoppingList)); // Store as string
        renderList();
    }

    function editItem(index) {
        // Example: Change item text
        const newText = prompt('Enter new text:', shoppingList[index].text);
        if (newText !== null) {
            shoppingList[index].text = newText;
            localStorage.setItem('SHOPPING_LIST', JSON.stringify(shoppingList)); // Update localStorage
            renderList();
        }
    }

    function deleteItem(index) {
        shoppingList.splice(index, 1);
        localStorage.setItem('SHOPPING_LIST', JSON.stringify(shoppingList)); // Update localStorage
        renderList();
    }

    addButton.addEventListener('click', () => {
        const newItemText = itemInput.value.trim(); // Trim whitespace
        if (newItemText !== '') {
            const newItem = {
                text: newItemText,
                purchased: false,
            };
            shoppingList.push(newItem);
            localStorage.setItem('SHOPPING_LIST', JSON.stringify(shoppingList)); // Update localStorage
            itemInput.value = '';
            renderList();
        }
    });

    clearButton.addEventListener('click', () => {
        shoppingList = [];
        localStorage.setItem('SHOPPING_LIST', JSON.stringify(shoppingList)); // Clear localStorage
        renderList();
    });

    renderList(); // Initial rendering
});




