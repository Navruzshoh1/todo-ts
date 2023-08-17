import React, { useState } from "react";
import "./App.css";
import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import deleted from "./assets/deleteicon.png";
import add from "./assets/addedicon.png";
import edit from "./assets/editicon.png";
import edit2 from "./assets/edit2.png";
import { IconButton } from "@mui/material";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from '@mui/material';

interface ITodo {
  id: number;
  title: string;
  complete: boolean;
}

function App() {
  //get
  const [todos, setTodos] = useState<ITodo[]>([
    {
      id: 1,
      title: "Имруз ба дарс рафтан!",
      complete: false,
    },
    {
      id: 2,
      title: "Иштироки фаъол!",
      complete: false,
    },
    {
      id: 3,
      title: "Ба пеш!!!",
      complete: false,
    },
  ]);
  /////////////////////////////////////////////////deleteeeeeeeeeeeeeeeee
  const [modaldelete, setModalDelete] = useState<boolean>(false);
  const [idxDelete, setIdxDelete] = useState<number>(0);

  const handleChangeDelete = (id: number) => {
    setModalDelete(true);
    setIdxDelete(id);
  };

  const deleteTodo = (id: number) => {
    let arr = todos.filter((e) => {
      return e.id != id;
    });
    setTodos(arr);
    setModalDelete(false);
  };

  //add
  const [text, setText] = useState<string>("");

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text.trim().length == 0) {
      alert("Add Todo");
    } else {
      let newObj = {
        id: Date.now(),
        title: text,
        complete: false,
      };
      setTodos([...todos, newObj]);
      setText("");
    }
  };

  //complete

  const compTodo = (id: number) => {
    let arr = todos.map((e) => {
      if (e.id === id) {
        return { ...e, complete: !e.complete };
      }
      return e;
    });
    setTodos(arr);
  };

  //edit

  const [textEdit, setTextEdit] = useState<string>("");
  const [idx, setIdx] = useState<number | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  const handleChange = (e: { title: string; id: number }) => {
    setTextEdit(e.title);
    setIdx(e.id);
    setModal(true);
  };

  const editTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let arr = todos.map((e) => {
      if (idx == e.id) {
        e.title = textEdit;
      }
      return e;
    });
    setTodos(arr);
    setModal(false);
  };

  //select filter

  const [filt, setFilt] = useState<string>("All");

  //search

  const [textSearch, setTextSearch] = useState<string>("");

  return (
    <>
      <h1 className="font text-[50px] pb-5 text-[#fff]">Руйхати корҳои ман</h1>
      <form
        className="flex items-center mb-10 justify-center gap-5"
        onSubmit={addTodo}
      >
        <TextField
          required={true}
          id="standard-basic"
          variant="standard"
          value={text}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setText(event.target.value)
          }
        />
        <Button variant="contained" color="inherit" type="submit">
          <img src={add} alt="" width={23} />
        </Button>
      </form>
      <div className="flex justify-between items-center pb-3">
        <div className="flex items-center gap-3 border-b-2">
          <IconButton>
            <FindInPageIcon className="text-[#fff]"></FindInPageIcon>
          </IconButton>
          <input
            className="outline-none bg-[#B66EB8] placeholder:text-[#fff]"
            type="text"
            value={textSearch}
            placeholder="Search..."
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setTextSearch(event.target.value)
            }
            required={true}
          />
        </div>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Filter</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={filt}
            label="Filter"
            onChange={(event:SelectChangeEvent<string>) =>
              setFilt(event.target.value)
            }
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Complete"}>Complete</MenuItem>
            <MenuItem value={"Uncomplete"}>Uncomplete</MenuItem>
          </Select>
        </FormControl>
      </div>

      {todos
        .filter((e) => {
          return e.title
            .toLowerCase()
            .includes(textSearch.toLowerCase().trim());
        })
        .filter((e) => {
          if (filt === "Complete") {
            return e.complete;
          } else if (filt === "Uncomplete") {
            return !e.complete;
          } else {
            return e;
          }
        })
        .map((todo) => (
          <div
            className="flex items-center justify-between mb-5 p-2 h-20 rounded-lg bg-[#EDF1F5]"
            key={todo.id}
          >
            <div className="flex items-center ">
              <Checkbox
                color="success"
                onClick={() => compTodo(todo.id)}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
              />
              <h1
                className="font2"
                style={{
                  textDecoration: todo.complete ? "line-through" : "none",
                  color: todo.complete ? "red" : "black",
                }}
              >
                {todo.title}
              </h1>
            </div>

            <div className="flex items-center">
              <IconButton onClick={() => handleChangeDelete(todo.id)}>
                <img src={deleted} alt="" width={23} />
              </IconButton>

              <IconButton onClick={() => handleChange(todo)}>
                <img src={edit} alt="" width={23} />
              </IconButton>
            </div>
          </div>
        ))}

      <Dialog
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h1 className="font text-[25px] text-center">Иваз кардан!</h1>
        </DialogTitle>
        <DialogContent>
          <form className="flex items-center gap-3" onSubmit={editTodo}>
            <TextField
              value={textEdit}
              onChange={(event) => setTextEdit(event.target.value)}
            />
            <IconButton type="submit">
              <img src={edit2} alt="" width={30} />
            </IconButton>
          </form>
        </DialogContent>
      </Dialog>
      {/* //deletedialog */}

      <Dialog
        open={modaldelete}
        onClose={() => setModalDelete(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h1 className="font text-[red] w-[200px] text-center ">
            "Шумо бешубҳа тоза кардан мехоҳед?
          </h1>
        </DialogTitle>
        <DialogContent className="flex items-center justify-center gap-5">
          <Button
            variant="outlined"
            color="error"
            onClick={() => deleteTodo(idxDelete)}
          >
            Бале
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={() => setModalDelete(false)}
          >
            Не
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
