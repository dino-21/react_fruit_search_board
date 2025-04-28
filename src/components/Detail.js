import React from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useState, useEffect } from "react"; // 한 줄로 합침
import { addItem } from "../store.js";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from 'styled-components'


let Banner = styled.div`
  padding : 20px;
  color : gray;
`;

let BannerBtn = styled.button`
  color : white;
  font-size:30px;
  width:100%;
  padding : 100px 100px;
  border:1px solid #ccc;
  background-image:url("../img/banner.jpg");
  background-size:cover;
  background-position:center;
`;


function Detail(props) {
  let { paramId } = useParams();
  let [tap, setTap] = useState(0);

  // React Hook은 조건 없이 컴포넌트 최상단에서 호출되어야 함
  let [fade2, setFade2] = useState("");

  // dispatch 정의 추가
  const dispatch = useDispatch();

  useEffect(() => {
    setFade2("end");
    return () => {
      setFade2("");
    };
  }, []);

  // 상품 유효성 체크 (이건 Hook 호출 이후에 실행되어야 함)

  let selproduct = props.fruit.find((x) => x.id === Number(paramId));

  // 훅은 조건문(if) 아래에서 호출하면 안 됨 (React가 Hook 순서 기억을 못함)
  if (!selproduct) {
    return <div>해당 상품이 존재하지 않습니다.</div>;
  }

  const { id, imgUrl, title, content, price } = selproduct;

  console.log("내가 선택한 상품은: " + id + " " + title);

  return (
    <div className={"container start " + fade2}>

    <Banner>
	  <BannerBtn>과일농장의 맛과 건강을 선물하세요.</BannerBtn>
	</Banner>


      <div className="row">
        <div className="col-md-6">
          <img src={"/" + imgUrl} width="100%" alt={title} />
        </div>
        <div className="col-md-6">
          <h5 className="pt-5">{title}</h5>
          <p>{content}</p>
          <p>{price}</p>
          <Button
            variant="primary"
            onClick={() => {
              //  dispatch(addItem(  {id : 1,  imgurl : 'fruit1.jpg', name : 'Grey Yordan', count : 1}))

              dispatch(
                addItem({
                  id: id,
                  imgurl: imgUrl.replace("img/", ""),
                  name: title,
                  count: 1,
                })
              );
            }}
            style={{ marginRight: "10px" }}
          >
            주문하기
          </Button>

          <Link to="/cart">
            <Button variant="outline-success"> 주문상품 확인하기 </Button>
          </Link>
        </div>
      </div>

      <Nav
        variant="tabs"
        defaultActiveKey="link0"
        style={{ marginTop: "50px" }}
      >
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTap(0);
            }}
            eventKey="link0"
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTap(1);
            }}
            eventKey="link1"
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTap(2);
            }}
            eventKey="link2"
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <TabContent tap={tap} />
    </div>
  );
}

function TabContent({ tap }) {
  let [fade, setFade] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 10);
    return () => {
      setFade("");
    };
  }, [tap]);

  return (
    <div className={"start " + fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tap]}
    </div>
  );
}

export default Detail;
