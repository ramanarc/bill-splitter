/* eslint-disable react/prop-types */

import { useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

// Parent App
export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleShowAddFriend = () => {
    // show is the same as showAddFriend (just a callback parameter)
    setShowAddFriend((show) => !show);
  };

  const handleAddFriend = (newFriend) => {
    setFriends((friends) => [...friends, newFriend]);
    setShowAddFriend(false);
  };

  const handleSelection = (friend) => {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    // setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    // setSelectedFriend(friend);
    // setShowAddFriend(false);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <h1 style={{ marginBottom: '16px' }}>Your friends</h1>
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'Close ' : 'Add friend'}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

// Reusable button component
function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <>
      <ul>
        {friends.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            onSelection={onSelection}
            selectedFriend={selectedFriend}
          />
        ))}
      </ul>
    </>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? 'selected' : ' '}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {/* The paragraph will only be shown when the condition we've set is true */}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button
        onClick={() => {
          onSelection(friend);
          // console.log(friend)
        }}
      >
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  );
}

// Form to add a new friend on the sidebar
function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  const handleAddFriendSubmit = (e) => {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = { id, name, image: `${image}?=${id}`, balance: 0 };
    onAddFriend(newFriend);

    setName('');
    setImage('https://i.pravatar.cc/48');
  };

  return (
    <form className="form-add-friend" onSubmit={handleAddFriendSubmit}>
      <label>Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰Bill value</label>
      <input type="number" />

      <label>💳Your expense</label>
      <input type="number" />

      <label>🧨{selectedFriend.name} expenses</label>
      <input type="text" disabled />

      <label>❓Who paid the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
