function openMenu_left() {
    const sideMenu = document.getElementById("sideMenu_left");
    const mainContent = document.getElementById("mainContent");
    const content = document.getElementById('content');
    const copiedContent = document.getElementById('copied_content');

    // Sprawdzanie, czy elementy istnieją
    if (sideMenu) {
        sideMenu.style.width = "85%";
    }
    if (mainContent) {
        mainContent.style.marginLeft = "85%";
    }
    if (content) {
        if (content.style.cssText) {
            content.style.cssText = content.style.cssText.replace(/display\s*:\s*[^;]+;/, 'display: none;');
        } else {
            content.style.display = 'none';
        }
    }
    if (copiedContent) {
        copiedContent.style.display = 'block';
    }
}

function openMenu_right() {
    const sideMenu = document.getElementById("sideMenu_right");
    const mainContent = document.getElementById("mainContent");
    const content = document.getElementById('content');
    const copiedContent = document.getElementById('copied_content');

    // Sprawdzanie, czy elementy istnieją
    if (sideMenu) {
        sideMenu.style.width = "85%";
    }
    if (mainContent) {
        mainContent.style.marginLeft = "85%";
    }
    if (content) {
        if (content.style.cssText) {
            content.style.cssText = content.style.cssText.replace(/display\s*:\s*[^;]+;/, 'display: none;');
        } else {
            content.style.display = 'none';
        }
    }
    if (copiedContent) {
        copiedContent.style.display = 'block';
    }
}

function closeMenu() {
    const sideMenu_left = document.getElementById("sideMenu_left");
    const sideMenu_right = document.getElementById("sideMenu_right");
    const mainContent = document.getElementById("mainContent");
    const content = document.getElementById('content');
    const copiedContent = document.getElementById('copied_content');

    // Sprawdzanie, czy elementy istnieją
    if (sideMenu_left) {
        sideMenu_left.style.width = "0";
    }
    if (sideMenu_right) {
        sideMenu_right.style.width = "0";
    }
    if (mainContent) {
        mainContent.style.marginLeft = "0";
    }
    if (content) {
        if (content.style.cssText) {
            content.style.cssText = content.style.cssText.replace(/display\s*:\s*[^;]+;/, 'display: block;');
        } else {
            content.style.display = 'none';
        }
    }
    if (copiedContent) {
        copiedContent.style.display = 'none';
    }
}
