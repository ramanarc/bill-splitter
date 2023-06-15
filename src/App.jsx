/* eslint-disable react/prop-types */

import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

// Reusable button component
function Button({ onShowAddFriend, children }) {
  return (
    <button onClick={onShowAddFriend} className="button">{children}</button>
  )
}

export default function App() {

  const [showFriendForm, setShowFriendForm] = useState(false);

  const handleShowAddFriend = () => {
    // show is the same as showFriendForm (just a callback parameter)
    setShowFriendForm((show) => !show);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        {showFriendForm && <FormAddFriend />}
        <Button onShowAddFriend={handleShowAddFriend}>{showFriendForm ? "Close " : "Add friend"}</Button>
      </div>
      <FormSplitBill />
    </div>
  )
}

function FriendsList() {

  const friends = initialFriends;
  return <>
    <ul>{friends.map((friend) => (
      <Friend friend={friend} key={friend.id} />
    ))}</ul>
  </>
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {/* The paragraph will only be shown when the condition we've set is true */}
      {friend.balance < 0 && <p className="red">You owe {friend.name} ${Math.abs(friend.balance)}</p>}
      {friend.balance > 0 && <p className="green">{friend.name} owes you ${Math.abs(friend.balance)}</p>}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button>Select</Button>
    </li>
  )
}



function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>👩🏻‍🤝‍👩🏻Friend Name</label>
      <input type="text" />

      <label>Image URL</label>
      <input type="text" />

      <Button>Add</Button>
    </form>
  )
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💰Bill value</label>
      <input type="number" />

      <label>💳Your expense</label>
      <input type="number" />

      <label>🧨Xs expenses</label>
      <input type="text" disabled />

      <label>❓Who paid the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">Friend Name</option>
      </select>

      <Button>Split bill</Button>
    </form>
  )
}