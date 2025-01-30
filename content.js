function deletePosts(options) {
    console.log("deletePosts 함수 실행");
    const posts = document.querySelectorAll("article");
    console.log(`${posts.length}개의 게시물을 찾았습니다.`);

    posts.forEach((post, index) => {
        const hasMedia = post.querySelector("img, video") !== null;
        const isRepost = post.innerText.includes("Reposted") || post.innerHTML.includes("data-testid=\"retweet\"");
        const isLiked = post.innerHTML.includes("data-testid=\"unlike\"");

        console.log(`게시물 ${index + 1}: hasMedia=${hasMedia}, isRepost=${isRepost}, isLiked=${isLiked}`);

        let shouldDelete = false;

        if (options.excludeMedia && hasMedia) shouldDelete = true;
        if (options.excludeReposts && isRepost) shouldDelete = true;
        if (options.excludeLiked && isLiked) shouldDelete = true;

        if (shouldDelete) {
            console.log(`게시물 ${index + 1} 삭제`);
            post.style.display = "none";
        }
    });
}

// 메시지를 받아 포스트를 삭제하는 이벤트 리스너
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("onMessage 이벤트 수신:", request);

    if (request.action === "clean_posts") {
        deletePosts(request.options);
        sendResponse({ success: true });
    }
});
