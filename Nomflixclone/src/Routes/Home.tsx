import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api";
import { IGetMoviesResult } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover; ;
`;

const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 20px;
  /* margin-top: 500px; */
`;

const Overview = styled.div`
  font-size: 20px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

// Box컴포넌트에는 bgPhoto prop이 정의되어 있지 않으므로 정의해주기
const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 60px;
  cursor: pointer;
  /* 첫번째와 마지막영화가 잘리는것을 방지 */
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

// 영화 정보주는 Box
const Info = styled(motion.div)`
  position: absolute;
  width: 100%;
  bottom: 0;
  opacity: 0;
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed; //화면에 꽉 차게하기 위해서
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

// 커서를 치웠을때가 아닌,올렸을 때만 딜레이를 주기 위해
const boxVarients = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

// Info컴포넌트에 사용할 variants
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween",
    },
  },
};

//한번에 보여주고 싶은 영화의 수
const offset = 6;

function Home() {
  // url을 바꾸기 위해
  const navigate = useNavigate();

  const bigMovieMatch = useMatch("/movies/:movieId");

  // console.log(bigMovieMatch);

  //사용자가 어디에 있든 가운데에 나오게 하기 위해서
  const { scrollY } = useScroll();

  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies, nowPlaying"],
    getMovies
  );

  const [index, setIndex] = useState(0);

  // 슬라이드 버그 해결하는 state
  const [leaving, setLeaving] = useState(false);

  //   index를 증가시키는 함수
  const increaseIndex = () => {
    // 타입스크립트 오류를 피하기 위해(totalMovies를 number로 만들기 위해)
    if (data) {
      if (leaving) return;
      toggleLeaving();

      //totalMovies는 영화의 총 개수에서 하나를 뺀 값
      // => Banner에서 하나를 사용했으므로
      const totalMovies = data?.results.length;

      // page가 0에서 시작하므로 -1을 해주어야함
      // 정수가 아닌 값이 들어갈수도 있으므로
      // 예를 들어 maxIndex가 4.2가 되면 페이지 4개를 채우고 영화가 조금 남으므로 ceil해주거나 floor처리하기
      // page가 0에서 시작하기 때문에 maxIndex도 -1 해주기
      const maxIndex = Math.floor(totalMovies / offset) - 1;

      // 증가시키려고 하는 index가 이미 maxIndex였디면 0으로 되돌리고 그렇지 않으면 증가시키기
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  // leaving을 반전시키는 함수
  const toggleLeaving = () => setLeaving((prev) => !prev);

  // Box가 클릭됐을 때 호출될 함수
  // => movieId를 인자로 받음
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  // Overlay 클릭했을때
  const onOverlayClicked = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              {/* key만 바꿔주고 있음 => key가 변경되면, React.js는 새로운 Row가 만드어졌다고 생각  */}
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key={index}
                transition={{ type: "tween", duration: 1 }}
              >
                {/* 배경으로 사용한 영화는 제외시켜주는 작업  */}
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      // movie.id는 number, layoutId는 string
                      layoutId={movie.id + ""}
                      onClick={() => onBoxClicked(movie.id)}
                      key={movie.id}
                      variants={boxVarients}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClicked}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <motion.div
                  layoutId={bigMovieMatch.params.movieId}
                  style={{
                    position: "absolute",
                    width: "40vw",
                    height: "80vh",
                    backgroundColor: "red",
                    top: scrollY.get() + 100,
                    left: 0,
                    right: 0,
                    margin: "0 auto",
                  }}
                />
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
