## 시작
장난삼아 버튼을 누르면 코인을 추천해주는 코인앵무새1.0을 만들었습니다. 코인앵무새가 10만의 방문 수를 얻을 만큼 반응이 좋자 추가적인 기능과 게임을 늘리는 개선 작업을 했습니다.

## 소개
한창 사기만 하면 오를 21년 4월, "이 수많은 코인을 언제 다 찾아! 그냥 아무거나 사자!"라는 사람들을 심심치 않게 찾을 수 있었고, 유머롭게 앵무새가 코인을 골라주는 간단한 서비스를 만들었습니다. 생각보다 큰 호응과 적지 않은 방문 수를 얻을 수 있었고, 이 사이트를 코인 정보를 나누는 커뮤니티 서비스로 키우자는 목표를 세웠습니다.

## 사용했던 기술과 서비스

REACT.js, Firebase, Redux

유저끼리 정보를 나누는 커뮤니티면 CRUD를 확실하게 구현해야 했습니다. 오늘의 기분 작업물의 경험을 토대로 MySql과 Flask를 사용할까 고민하다 Firebase라는 구글의 서비스를 활용하기로 했습니다. Firebase라는 서비스는 어떤 경험을 주고 어떻게 구동되는지 궁금하기도 했고 빠르고 간단하게 사이트를 구현할 수 있기 때문이었습니다.


## 주요 기능들 

### 게시글 기능
![](https://images.velog.io/images/lamda/post/ec3930da-dc08-4127-b7da-391e6d218c8a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-01-10%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2011.35.41.png)

코인을 토론할 수 있는 게시판입니다. 로그인 한 회원들만 글을 쓸 수 있도록 했으며 만약 비회원일 경우
로그인 창으로 이동할 수 있도록 작업을 했습니다. 여기서 고민은 더보기를 누를 때마다 어떻게 다시 정보를 받아오지? 에 대한 고민이었습니다. firebase만의 방법을 써야 하기에 공식 문서의 힌트와 stackofflow의 글로 limit을 걸어 새로운 배열에 다시 받아오는 방법으로 활용했습니다. 확실히 firebase에서의 기능을 활용하기에 내가 상상했던 코드로 받아오기에는 약간의 제약이 있구나를 느꼈습니다.

```
    const onSnapshotState = snapshot => {
        const isCollectionEmpty = snapshot.size === 0;

            if(!isCollectionEmpty) {
                const array = snapshot.docs.map(doc => ({
                    id:doc.id,
                    time:new Date(),
                    ...doc.data()
                }))
                const lastDoc = snapshot.docs[snapshot.docs.length-1];
                getBoard(board => [...board,...array]);
                setLastDoc(lastDoc);
                setLoading(false);
            }else{
                setLoading(false);
                setIsEmpty(true);
            }
    }

    const fetchMore = () => {
        setLoading(true);
        fistore.startAfter(lastDoc).limit(15)
        .onSnapshot(snapshot =>{
            onSnapshotState(snapshot);
        })
    };


    useEffect(()=> {
        fistore.limit(15)
        .onSnapshot(snapshot => {
           onSnapshotState(snapshot);
        })
    },[])
```

 ### 댓글
 ![](https://images.velog.io/images/lamda/post/207a8f5e-ad9a-4564-ae80-deebf1203da0/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-01-10%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2011.43.05.png)
 댓글과 좋아요 기능입니다. 게시글보다 중요한 댓글이라고 생각한 만큼 가장 생각과 시간이 많이 들었습니다. 게시글이라는 문서 아래 다른 컬렉션을 만들어 좋아요를 누르면 유저의 정보가 담기는 방식으로 접근해 유저가 좋아요한 글은 언제나 활성화 상태이도록 설정했습니다.
댓글도 마찬가지로 문서 id를 따라가도록 컬렉션을 만들어 게시글의 원리로 작업했습니다.

### 글쓰기
![](https://images.velog.io/images/lamda/post/32b8ea2d-98f8-4416-aa1e-83b74bf7d173/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-01-10%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2011.48.29.png)

글쓰기 기능입니다. 제목과 내용란에 글을 적고 올리기 버튼을 누르면 유저 정보와 생성 날짜, 글의 내용이 담깁니다.

### 수정하기
![](https://images.velog.io/images/lamda/post/1456225e-7647-4ac0-9454-ec3ce98f34c8/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-01-10%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2011.50.19.png)
수정하기입니다. 글쓴이가 로그인 했을 때만 수정하기 버튼이 보이며 수정하기를 누르면 유저 정보와 글쓴이가 맞는지 확인을 하고 해당 게시글의 id를 가져와 내용을 재출력합니다. 그리고 글을 수정해서 수정 버튼을 누르면 새로운 내용으로 올라가게 됩니다.

### 게임기능
![](https://images.velog.io/images/lamda/post/2f9a6774-105a-4079-b17a-b7c16b0e5500/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-01-10%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2011.53.37.png)

가장 인기가 많던 코인 뽑기와 새로 추가한 코인 룰렛돌리기, 가격 현황표입니다.
업비트API로 코인 정보를 받아와 앵무새를 클릭하면 코인, 코인 가격과 현재 가격, 1일 등락을 알려줍니다.

### 로그인,회원가입 기능
![](https://images.velog.io/images/lamda/post/475bdbc0-5346-4b42-896c-c433f15f6f28/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-01-10%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2011.55.46.png)

로그인,회원가입 기능입니다. 회원가입 기능에 대해 보안이 중요할텐데 어떻게 코드를 구성하면 좋을까 고민을 했는데 Firebase에서 로그인, 회원가입, 비밀번호 찾기 등 많은 기능을 지원해 손쉽게 작업할 수 있었습니다.

### 작업하면서 느낀점
오늘의 기분이라는 작업을 통해 CRUD는 건드렸구나 생각했지만, 게시글을 업로드하고 수정하고 삭제하는 과정에 서버, 데이터베이스의 연결이 정말 중요하다고 느꼈습니다. 게시글 안에 또다른 게시글을 접근하면서 db가 복잡해져가는 것을 보고 첫 설계와 정리를 제대로 해야겠다는 점도 느꼈습니다.

### 제작 과정
제작 기간:2개월
활용한 스택, 서비스: React.JS,Redux,Firebase,PostCSS

