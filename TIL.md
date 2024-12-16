# 임시 기록용 TIL.md

# Promotion 페이지에 애니메이션 추가하기 

맨 처음 접근은 keyframe 관련해서 애니메이션 사이트를 찾아보는 것이었다. 
그래서 // 출처 : https://www.minimamente.com/project/magic/ 사이트에 가서 scss를 가져와서 import, 버튼 클릭시 동작하게 예제 만듦.

근데 스크롤 올라왔을 때 이걸 해야 함. 편한 라이브러리 찾다가 gsap을 발견. 
보니까 scrollTrigger도 포함해서 애니메이션도 연계 적용이 가능하다고 함. 
그래서 기존 scss 대신 이걸로 처리

