import axios from 'axios'
import { useEffect, useState } from 'react';

function List({data,setData}) {

      const remove = (id)=>{
        axios.delete(`${process.env.REACT_APP_SERVER}/abc/${id}`)
        .then(res => {
          setData(res.data)
        })

        console.log(id);
      }
      
  return(
    <>
      {
        data.map(obj=>(
            <li key={obj.id}>
              {obj.msg}
              <button onClick={()=>{remove(obj.id)}}>삭제</button>
            </li>
        ))
      }
    </>
    
  );
}

function Write({setData}) {
  const insert = (e) => {
    e.preventDefault();
    let msg = e.target.msg.value;
    
    axios.post(`${process.env.REACT_APP_SERVER}/insert`,{msg})
    .then( res=> {
      setData(res.data)
    });
  }

  return(
    <div>
      <form onSubmit={insert}>
        <input type="text" name="msg"/>
        <input type="submit" value="저장" />
      </form>
    </div>
  );
}

function App() {
  const [data, setData] = useState([]);

  const getData = ()=>{
    axios.get(`${process.env.REACT_APP_SERVER}/abc`)
    .then(res=>{
      setData(res.data);
      //res.data를 data에 저장
    });
  }
  
  //useEffect로 뿌려주기
  useEffect(()=>{
    getData();
  }, [])
  // axios.post('http://localhost:3030/insert',{id:1000,name:'신규데이터'})
  // .then(res => {
  //   console.log(res);
  // })




  return (
    <div>
      <h2>한줄댓글</h2>
      <Write data={data} setData={setData}/>      

      <ul>
        <List data={data} setData={setData} />
      </ul>
    </div>
  );
}

export default App;
