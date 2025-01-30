document.getElementById("cleanPosts").addEventListener("click", () => {
    const options = {
        excludeMedia: document.getElementById("excludeMedia").checked,
        excludeReposts: document.getElementById("excludeReposts").checked,
        excludeLiked: document.getElementById("excludeLiked").checked,
    };

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "clean_posts", options }, (response) => {
            if (response && response.success) {
                console.log("삭제 요청이 성공적으로 처리되었습니다.");
            } else {
                console.error("삭제 요청 처리 중 문제가 발생했습니다.");
            }
        });
    });
});
