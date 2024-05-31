<!-- 增改SPU -->
<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请你输入SPU名称" v-model="SpuParams.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select v-model="SpuParams.tmId">
                <el-option v-for="(item, index) in AllTradeMark" :key="item.id" :label="item.tmName"
                    :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textarea" placeholder="请你输入SPU描述" v-model="SpuParams.description"></el-input>
        </el-form-item>
        <el-form-item label="SPU图片">
            <!-- Upload上传 v-model:fileList:默认上传文件 action:上传接口的URL,需要加上vite.config.ts中配置的vite
            的proxy(代理跨域)的拦截路径(/api) list-type:设定文件列表的样式 on-preview:点击文件列表中已上传的文件时的钩子
            on-remove:文件列表移除文件时的钩子 before-upload:上传文件之前的钩子(函数),参数为上传的文件,
            可以用于限制文件类型和大小,若返回false或者返回Promise且被reject,则停止上传 -->
            <el-upload v-model:file-list="<any>imgList" action="/api/admin/product/fileUpload" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handlerUpload">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <!-- Dialog对话框 需要一个v-model:布尔值控制对话框的显示 -->
            <el-dialog v-model="dialogVisible">
                <!-- w-full,CSS类,宽度为100% -->
                <img w-full :src="dialogImageUrl" alt="Preview Image" style="width:100%;height: 100%;" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
            <!-- 展示销售属性的下拉菜单 -->
            <el-select v-model="saleAttrIdAndValueName"
                :placeholder="unSelectSaleAttr.length ? `还未选择${unSelectSaleAttr.length}个` : '无'">
                <el-option :value="`${item.id}:${item.name}`" v-for="(item, index) in unSelectSaleAttr" :key="item.id"
                    :label="item.name"></el-option>
            </el-select>
            <!-- disabled:是否禁用该选项 -->
            <el-button @click="addSaleAttr" :disabled="saleAttrIdAndValueName ? false : true" style="margin-left:10px"
                type="primary" size="default" icon="Plus">添加属性</el-button>
            <!-- table展示销售属性与属性值的地方 border:竖直方向的边框 -->
            <el-table border style="margin:10px 0px" :data="saleAttr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="销售属性名字" width="120px" prop="saleAttrName"></el-table-column>
                <el-table-column label="销售属性值">
                    <!-- row:即为当前SPU已有的销售属性对象 -->
                    <template #="{ row, $index }">
                        <!-- Tag标签 close:关闭Tag时触发的事件 closable:是否可关闭 -->
                        <el-tag style="margin:0px 5px" @close="row.spuSaleAttrValueList.splice(index, 1)"
                            v-for="(item, index) in row.spuSaleAttrValueList" :key="row.id" class="mx-1" closable>
                            {{ item.saleAttrValueName }}
                        </el-tag>
                        <!-- blur:当选择器的输入框失去焦点时触发 -->
                        <el-input @blur="toLook(row)" v-model="row.saleAttrValue" v-if="row.flag == true"
                            placeholder="请你输入属性值" size="small" style="width:100px"></el-input>
                        <el-button @click="toEdit(row)" v-else type="primary" size="small" icon="Plus"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <template #="{ row, $index }">
                        <!-- 增删数组splice(下标,删多少(默认后面全删),新元素) -->
                        <el-button type="primary" size="small" icon="Delete"
                            @click="saleAttr.splice($index, 1)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <!-- disabled:是否禁用该选项 -->
            <el-button :disabled="saleAttr.length > 0 ? false : true" type="primary" size="default"
                @click="save">保存</el-button>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import {
    reqAllTradeMark, reqSpuImageList, reqSpuHasSaleAttr,
    reqAllSaleAttr, reqAddOrUpdateSpu
} from '@/api/product/spu'
import type {
    SpuData, SaleAttrValue, HasSaleAttr, SaleAttr,
    SpuImg, Trademark, AllTradeMark, SpuHasImg,
    SaleAttrResponseData, HasSaleAttrResponseData
} from '@/api/product/spu/type';
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
//使用defineEmits来定义组件可以触发的事件,changeScene是父组件的一个自定义事件
let $emit = defineEmits(['changeScene']);
//点击取消按钮:通知父组件切换场景为0(scene.value=flag,显示已有SPU)
//$emit()​在当前组件触发一个自定义事件,参数传递给事件的函数
const cancel = () => {
    $emit('changeScene', { flag: 0, params: 'update' });
}
//存储已有的SPU这些数据
let AllTradeMark = ref<Trademark[]>([]);
//商品图片
let imgList = ref<SpuImg[]>([]);
//已有的SPU销售属性
let saleAttr = ref<SaleAttr[]>([]);
//全部销售属性
let allSaleAttr = ref<HasSaleAttr[]>([]);
//控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false);
//存储预览图片地址
let dialogImageUrl = ref<string>('')
//存储已有的SPU对象
let SpuParams = ref<SpuData>({
    category3Id: "",//收集三级分类的ID
    spuName: "",//SPU的名字
    description: "",//SPU的描述
    tmId: '',//品牌的ID
    spuImageList: [],
    spuSaleAttrList: [],
});
//将来收集还未选择的销售属性的ID与属性值的名字
let saleAttrIdAndValueName = ref<string>('')
//对外暴露的子组件方法,获取完整已有的SPU的数据,用于修改已有SPU
const initHasSpuData = async (spu: SpuData) => {
    //存储已有的SPU对象,在修改中展示,spu:即为父组件传递过来的已有的SPU对象
    SpuParams.value = spu;
    //获取全部品牌的数据
    let result: AllTradeMark = await reqAllTradeMark();
    //获取某一个品牌旗下全部售卖商品的图片
    let result1: SpuHasImg = await reqSpuImageList((spu.id as number));
    //获取已有的SPU销售属性的数据
    let result2: SaleAttrResponseData = await reqSpuHasSaleAttr((spu.id as number));
    //获取整个项目全部SPU的销售属性
    let result3: HasSaleAttrResponseData = await reqAllSaleAttr();
    //存储全部品牌的数据
    AllTradeMark.value = result.data;
    //SPU对应商品图片
    //map(),对数组每个元素执行函数,返回包含执行函数后的新数组
    imgList.value = result1.data.map(item => {
        return {
            name: item.imgName,
            url: item.imgUrl
        }
    })
    //存储已有的SPU的销售属性
    saleAttr.value = result2.data;
    //存储全部的销售属性
    allSaleAttr.value = result3.data;
}
//照片预览按钮的钩子
const handlePictureCardPreview = (file: any) => {
    dialogImageUrl.value = file.url;
    //对话框弹出来
    dialogVisible.value = true;
}
//照片墙删除文件钩子
const handleRemove = () => {
}
//照片上传成功之前的钩子,约束文件的大小与类型
const handlerUpload = (file: any) => {
    if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') {
        if (file.size / 1024 / 1024 < 3) {
            return true;
        } else {
            ElMessage({
                type: 'error',
                message: '上传文件务必小于3M'
            })
            return false;
        }
    } else {
        ElMessage({
            type: 'error',
            message: '上传文件务必PNG|JPG|GIF'
        })
        return false;
    }
}

//计算出当前SPU还未拥有的销售属性
let unSelectSaleAttr = computed(() => {
    //全部销售属性:颜色、版本、尺码
    //已有的销售属性:颜色、版本
    //filter数组方法,对所有数组元素执行回调函数,符合的包含在新数组中
    let unSelectArr = allSaleAttr.value.filter(item => {
        //every方法,检测数组所有元素是否符合回调函数
        return saleAttr.value.every(item1 => {
            return item.name != item1.saleAttrName;
        });
    })
    return unSelectArr;
})

//添加销售属性的方法
const addSaleAttr = () => {
    //split分割字符串
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':');
    //准备一个新的销售属性对象:将来带给服务器即可
    let newSaleAttr: SaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
    }
    //追加到数组当中
    saleAttr.value.push(newSaleAttr);
    //清空收集的数据
    saleAttrIdAndValueName.value = '';
}

//属性值按钮的点击事件
const toEdit = (row: SaleAttr) => {
    //点击按钮的时候,input组件不就不出来->编辑模式
    row.flag = true;
    row.saleAttrValue = ''
}
//表单元素失去焦点的事件回调
const toLook = (row: SaleAttr) => {
    //整理收集的属性的ID与属性值的名字
    const { baseSaleAttrId, saleAttrValue } = row;
    //整理成服务器需要的属性值形式
    let newSaleAttrValue: SaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: (saleAttrValue as string)
    }
    //非法情况判断
    //trim(),js的方法,去除字符串两端的空白字符
    if ((saleAttrValue as string).trim() == '') {
        ElMessage({
            type: 'error',
            message: '属性值不能为空的'
        })
        return;
    }
    //判断属性值是否在数组当中存在
    let repeat = row.spuSaleAttrValueList.find(item => {
        return item.saleAttrValueName == saleAttrValue;
    })
    if (repeat) {
        ElMessage({
            type: 'error',
            message: '属性值重复'
        })
        return;
    }
    //追加新的属性值对象
    row.spuSaleAttrValueList.push(newSaleAttrValue);
    //切换为查看模式
    row.flag = false;
}

//保存按钮的回调
const save = async () => {
    //整理参数
    //发请求:添加SPU|更新已有的SPU
    //成功
    //失败
    //1:照片墙的数据
    //map(),对数组每个元素执行函数,返回包含执行函数后的新数组
    SpuParams.value.spuImageList = imgList.value.map((item: any) => {
        return {
            imgName: item.name,//图片的名字
            imgUrl: (item.response && item.response.data) || item.url
        }
    });
    //2:整理销售属性的数据
    SpuParams.value.spuSaleAttrList = saleAttr.value;
    let result = await reqAddOrUpdateSpu(SpuParams.value);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: SpuParams.value.id ? '更新成功' : '添加成功'
        })
        //通知父组件切换场景为0
        $emit('changeScene', { flag: 0, params: SpuParams.value.id ? 'update' : 'add' });
    } else {
        ElMessage({
            type: 'success',
            message: SpuParams.value.id ? '更新成功' : '添加成功'
        })
    }
}

//添加一个新的SPU初始化请求方法
const initAddSpu = async (c3Id: number | string) => {
    //清空数据
    Object.assign(SpuParams.value, {
        category3Id: "",//收集三级分类的ID
        spuName: "",//SPU的名字
        description: "",//SPU的描述
        tmId: '',//品牌的ID
        spuImageList: [],
        spuSaleAttrList: [],
    });
    //清空照片
    imgList.value = [];
    //清空销售属性
    saleAttr.value = [];
    saleAttrIdAndValueName.value = '';
    //存储三级分类的ID
    SpuParams.value.category3Id = c3Id;
    //获取全部品牌的数据
    let result: AllTradeMark = await reqAllTradeMark();
    let result1: HasSaleAttrResponseData = await reqAllSaleAttr();
    //存储数据
    AllTradeMark.value = result.data;
    allSaleAttr.value = result1.data;
}
//对外暴露
defineExpose({ initHasSpuData, initAddSpu })
</script>

<style scoped></style>