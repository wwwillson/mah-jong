
//function selectTile(tileValue) {
//    document.getElementById("selectedTile").value = tileValue;
//    document.getElementById("selectTileForm").submit();
//}

var maxSelections = 4; // 最大允许选择的次数
var imageSelections = {}; // 记录每张图片的选择次数

function toggleSelection(tile) {
    var imageAlt = tile;

    // 如果没有记录该图片的选择次数，初始化为0
    if (!imageSelections[imageAlt]) {
        imageSelections[imageAlt] = 0;
    }

    if (imageSelections[imageAlt] < maxSelections) {
        var hiddenInput = document.createElement('input');
        var inputId = 'input_' + imageAlt + '_' + imageSelections[imageAlt]; // 生成唯一的标识
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'selectedTile';
        hiddenInput.value = imageAlt;
        hiddenInput.id = inputId; // 设置唯一的id
        document.getElementById('selectTileForm').appendChild(hiddenInput);

        // Update selected images container
        var selectedImagesContainer = document.getElementById('selectedTilesContainer');
        var img = document.createElement('img');
        img.classList.add("image-container");
        img.src = '/images/0' + imageAlt + '.jpg';
        img.alt = imageAlt;
        img.dataset.inputId = inputId; // 将唯一的id保存在data属性中
        img.onclick = function () { removeSelectedImage(this); }; // 添加点击事件处理函数
        selectedImagesContainer.appendChild(img);

        imageSelections[imageAlt]++; // 增加当前图片的选择次数

        // 如果达到最大选择次数，添加一个类来禁用点击事件
        if (imageSelections[imageAlt] === maxSelections) {
            disableImage(imageAlt);
        }
    }
}

function disableImage(imageAlt) {
    var image = document.querySelector('#selectTileForm img[alt="' + imageAlt + '"]');
    if (image) {
        image.classList.add('disabled'); // 添加一个类
    }
}

function removeSelectedImage(selectedImage) {
    // 移除选中的图片
    selectedImage.remove();

    var inputId = selectedImage.dataset.inputId;

    // 移除对应的input元素
    var inputElement = document.getElementById(inputId);
    if (inputElement) {
        inputElement.remove();
    }

    var imageAlt = selectedImage.alt;

    // 减少当前图片的选择次数
    imageSelections[imageAlt]--;

    // 如果当前图片选择次数小于最大选择次数，移除禁用状态
    if (imageSelections[imageAlt] < maxSelections) {
        enableImage(imageAlt);
    }
}

function enableImage(imageAlt) {
    var image = document.querySelector('#selectTileForm img[alt="' + imageAlt + '"]');
    if (image) {
        image.classList.remove('disabled'); // 移除禁用状态类
    }
}