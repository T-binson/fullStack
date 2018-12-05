// 冒泡排序
// (原理：相邻数字两两比较，谁小谁在前，比较到最后时也得出了该次循环的最大值，所以类似于冒泡现象)
function bubbleSort(arr) {
	//获取传入数组的长度
	var len = arr.length;
	//从第一项开始
	for(var i = 0; i < len - 1; i++) {
		//j < len -1 - i -->后面已经得出的最大值不用再比较
		for(var j = 0; j < len - 1 - i; j++) {
			//符合条件则交换位置
			if (arr[j] > arr[j + 1]) {
				var temp = arr[j + 1];
				arr[j + 1] = arr[j];
				arr[j] = temp;
			}
		}
	}
	return arr;
}

// 快速排序
function swap(items, firstIndex, secondIndex) {
	var temp = items[firstIndex];
	items[firstIndex] = items[secondIndex];
	items[secondIndex] = temp;
}
function partition(items, left, right) {
	var pivot = items[Math.floor((right + left) / 2)],
			i = left,
			j = right;
	while(i <= j) {
		while(items[i] < pivot) {
			i++;
		}
		while(items[j] > pivot) {
			j--;
		}
		if (i <= j) {
			swap(items, i, j);
			i++;
			j--;
		}
	}
	return i;
}
function quickSort(items, left, right) {
	var index;
	if (items.length > 1) {
		index = partition(items, left, right);
		if (left < index - 1) {
			quickSort(items, left, index - 1);
		}
		if (index < right) {
			quickSort(items, index, right)
		}
	}
	return items;
}

// 插入排序
// (原理：从索引值1开始进行比较，依次跟前面的项比较，小于前面的项就往前移动，直到大于等于前面的某项，然后插入该位置)
function insertSort(arr) {
	//数组长度
	var len = arr.length;
	//设置索引标记
	var preIndex, current;
	for(var i = 1; i < len; i ++) {
		//前一项索引
		preIndex = i - 1;
		//保存当前项
		current = arr[i];
		//判断前一项索引值是否存在(大于等于0)和前一项是否大于当前项
		while(preIndex >= 0 && arr[preIndex] > current) {
			//前一项大于当前当前项，将前一项赋值给它的下一项
			arr[preIndex + 1] = arr[preIndex];
			//重置前一项索引值，然后进行下一个循坏
			preIndex--;
		}
		//如果不符合循环条件，则跳出while循环，并把当前项赋值给不符合条件时的下一项(即当前项大于前一项了)
		arr[preIndex + 1] = current;
	}
	return arr;
}
function insertSort(arr) {
	//数组长度
	var len = arr.length;
	//设置索引标记
	var preIndex, current;
	for(var i = 1; i < len; i ++) {
		//前一项索引
		preIndex = i - 1;
		//保存当前项
		current = arr[i];
		//判断前一项索引值是否存在(大于等于0)
		for( ; preIndex >= 0; preIndex--) {
			if(arr[preIndex] > current) {
				//前一项大于当前当前项，将前一项赋值给它的下一项
				arr[preIndex+1] = arr[preIndex];
			}else {
				break;
			}
		}
		arr[preIndex+1] = current;
	}
	return arr;
}

// 选择排序
// (原理：从目标值开始，假设目标值最小并记录为最小索引，然后和其他项比较，得出比目标值小的项的索引并赋值给最小索引，然后在此基础上再继续查找最小值和记录最小索引，直到遍历完数组，剩下依次类推)
function selectionSort(arr) {
	//获取数组长度
	var len = arr.length;
	//设置最小索引值变量和临时值变量
	var minIndex, temp;
	for(var i = 0; i < len - 1; i++) {
		//假设第一位是最小值
		minIndex = i;
		for(var j = i + 1; j < len; j++) {
			if (arr[j] < arr[minIndex]) {
				//将最小值索引值更新为比较得出的索引值，然后继续比较直到数组末尾
				minIndex = j;
			}
		}
		//临时保存起始值
		temp = arr[i];
		//交换起始值和最小值
		arr[i] = arr[minIndex];
		arr[minIndex] = temp;
	}
	return arr;
}
// 时间复杂度