<!-- Trademark(商标),品牌管理 -->
<template>
    <div>
        <!-- Card卡片 -->
        <el-card class="box-card">
            <!-- 卡片顶部添加品牌按钮 v-has:自定义指令,用户有权限则显示按钮 has(有),
                btn.Trademark.add是一个表达式,它用于检查用户是否有权限 -->
            <el-button type="primary" size="default" icon="Plus" @click="addTrademark"
            v-btn="'btn.Trademark.add'">添加品牌</el-button>
            <!-- 表格组件:用于展示已有得平台数据 border:竖直方向的边框 data:对象数组 -->
            <el-table style="margin:10px 0px" border :data="trademarkArr">
                <!-- label:列名 type:对应列的类型 prop:用来对应对象中的键名即可填入数据 --> <!-- table-column:默认展示数据用div -->
                <el-table-column  label="序号" width="80px" align="center" type="index"></el-table-column>
                <el-table-column align="center" label="名称" prop="tmName"></el-table-column>
                <el-table-column align="center" label="LOGO">
                    <!-- 结构赋值row:当前行的数据 $index:当前行的索引 -->
                    <template #="{ row }">
                        <img :src="row.logoUrl" style="max-width: 128px; max-height: 128px;" alt="图片加载失败">
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <!-- 结构赋值row:当前行的数据 $index:当前行的索引 -->
                    <template #="{ row }">
                        <!-- 修改按钮 -->
                        <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)" v-btn="'btn.Trademark.update'"></el-button>
                        <!-- Popconfirm气泡确认框 title标题(文本) confirm:点击确认按钮时触发事件 -->
                        <el-popconfirm :title="`您确定要删除${row.tmName}?`" width="250px" icon="Delete"
                            @confirm='removeTradeMark(row.id)'>
                            <!-- reference:插槽,触发Popconfirm气泡确认框的HTML元素 -->
                            <template #reference>
                                <!-- 删除按钮 -->
                                <el-button type="primary" size="small" icon="Delete" v-btn="'btn.Trademark.remove'"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器组件 Pagination分页
            事件 @size-change: page-size改变时触发 @current-change: current-page改变时触发
            属性 pager-count:分页器中显示的页码数量,当总页数超过该值时会折叠
            current-page:当前页码 page-size:每页显示条目个数 page-sizes:每页显示个数选择器的选项设置
            background:分页器是否带有背景色 layout:分页器六个子组件布局调整 total:总条目数 -->
            <el-pagination @size-change="sizeChange" @current-change="getHasTrademark" :pager-count="9"
                v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
                layout="prev, pager, next, jumper,->,sizes,total" :total="total" />
        </el-card>
        <!-- 对话框组件:在添加品牌与修改已有品牌的业务时候使用结构 -->
        <!-- Dialog对话框 需要一个v-model:布尔属性控制对话框的显示 draggable:对话框拖拽 插槽footer:按钮操作区的内容 -->
        <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'" draggable>
            <!-- :model,v-model缩写 rules表单验证规则 ref为表单定义了一个引用 -->
            <el-form style="width: 80%;" :model="trademarkParams" :rules="rules" ref="formRef">
                <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                    <!-- placeholder:输入框占位文本 -->
                    <el-input placeholder="请您输入品牌名称" v-model="trademarkParams.tmName"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
                    <!-- Upload上传 action:上传接口的URL,需要加上vite.config.ts中配置的vite的proxy(代理跨域)的拦截路径(/api)
                    show-file-list:是否显示已上传文件列表 on-success:文件上传成功时的钩子(函数)
                    before-upload:上传文件之前的钩子(函数),参数为上传的文件,可以用于限制文件类型和大小,
                    若返回false或者返回Promise且被reject,则停止上传 -->
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <!-- 具名插槽:footer 按钮操作区的内容 -->
            <template #footer>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
                <el-button type="primary" size="default" @click="confirm">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
// ElMessage,Message消息提示 UploadProps,el-plus中Upload上传组件的ts类型
import { ElMessage, type UploadProps } from 'element-plus'
// import { ElMessage, type UploadProps, formEmits } from 'element-plus'
//onMounted:组件挂载完毕钩子
import { ref, onMounted, reactive, nextTick } from 'vue';
//引入品牌管理接口和ts类型
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark';
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type'

//当前页码,双向绑定
let pageNo = ref<number>(1);
//每一页展示多少条数据,双向绑定
let limit = ref<number>(3);
//存储已有品牌数据总数,props
let total = ref<number>(0);
//存储已有品牌的数组
let trademarkArr = ref<Records>([]);
//控制对话框显示与隐藏,双向绑定
let dialogFormVisible = ref<boolean>(false)
//定义收集新增品牌数据,双向绑定
let trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
})
//获取el-form组件实例
let formRef = ref();
//获取已有品牌的接口封装为一个函数:在任何情况下向获取数据,调用此函数即可
const getHasTrademark = async (pager = 1) => {
    //当前页码
    pageNo.value = pager;
    // reqHasTrademark:接口,获取已有品牌(第几页,每页几个品牌数据)
    let result: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value);
    if (result.code == 200) {
        //存储总个数和获取到(页面呈现)的数组
        total.value = result.data.total;
        trademarkArr.value = result.data.records;
    }
}
//组件挂载完毕钩子---发一次请求,获取第一页、一页三个已有品牌数据
onMounted(() => {
    getHasTrademark();
});
//分页器当前页码发生变化的时候会触发
//对于当前页码发生变化自定义事件,组件pagination父组件回传了数据(当前的页码)
// const changePageNo = ()=>{
//     //当前页码发生变化的时候再次发请求获取对应已有品牌数据展示
//     getHasTrademark();
// }

//当下拉菜单发生变化的时候触发次方法
//这个自定义事件,分页器组件会将下拉菜单选中数据返回
const sizeChange = () => {
    //当前每一页的数据量发生变化的时候，当前页码归1
    getHasTrademark();
}
//添加品牌按钮的回调
const addTrademark = () => {
    //对话框显示
    dialogFormVisible.value = true;
    //清空收集数据
    trademarkParams.id = 0;
    trademarkParams.tmName = '';
    trademarkParams.logoUrl = '';
    //第一种写法:ts的问号语法
    // formRef.value?.clearValidate('tmName');
    // formRef.value?.clearValidate('logoUrl');
    //nextTick,在下一次DOM更新循环结束之后执行延迟回调 clearValidate,el-form组件方法,清除表单的验证错误信息
    nextTick(() => {
        formRef.value.clearValidate('tmName');
        formRef.value.clearValidate('logoUrl');
    })
}
//修改已有品牌的按钮的回调
//row:row即为当前已有的品牌
const updateTrademark = (row: TradeMark) => {
    //清空校验规则错误提示信息
    nextTick(() => {
        formRef.value.clearValidate('tmName');
        formRef.value.clearValidate('logoUrl');
    })
    //对话框显示
    dialogFormVisible.value = true;
    //ES6语法合并对象
    Object.assign(trademarkParams, row);
}
//对话框底部取消按钮
const cancel = () => {
    //对话框隐藏
    dialogFormVisible.value = false;
}
//对话框底部确定按钮
const confirm = async () => {
    //在你发请求之前,要对于整个表单进行校验
    //调用这个方法进行全部表单相校验,如果校验全部通过,在执行后面的语法
    //validate,el-form组件方法，用于对表单进行校验
    await formRef.value.validate();
    //reqAddOrUpdateTrademark,接口,用于添加与修改已有品牌
    let result: any = await reqAddOrUpdateTrademark(trademarkParams);
    //添加|修改已有品牌
    if (result.code == 200) {
        //关闭对话框
        dialogFormVisible.value = false;
        //弹出提示信息
        ElMessage({
            type: 'success',
            message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
        });
        //再次发请求获取已有全部的品牌数据
        getHasTrademark(trademarkParams.id ? pageNo.value : 1);
    } else {
        //添加品牌失败
        ElMessage({
            type: 'error',
            message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败'
        });
        //关闭对话框
        dialogFormVisible.value = false;
    }
}
//上传图片组件->上传图片之前触发的钩子函数,上传文件成功之前可以约束文件类型与大小
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    //要求:上传文件格式png|jpg|gif 4M
    if (rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif') {
        if (rawFile.size / 1024 / 1024 < 1) {
            return true;
        } else {
            ElMessage({
                type: 'error',
                message: '上传文件大小需小于1M'
            })
            return false;
        }
    } else {
        ElMessage({
            type: 'error',
            message: "上传文件格式务必PNG|JPG|GIF"
        })
        return false;
    }
}
//图片上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, _uploadFile) => {
    //response:即为当前这次上传图片post请求服务器返回的数据
    //收集上传图片的地址,添加一个新的品牌的时候带给服务器
    trademarkParams.logoUrl = response.data;
    //图片上传成功,清除掉对应图片校验结果
    formRef.value.clearValidate('logoUrl');
}

//品牌自定义校验规则方法,el表单的自定义校验中回调函数(callBack)必须被调用,在表单校验规则对象rules中使用
const validatorTmName = (_rule: any, value: any, callBack: any) => {
    //当表单元素触发blur(元素失去焦点时触发)时候,会触发此方法
    //trim(),js的方法,去除字符串两端的空白字符
    if (value.trim().length >= 2) {
        callBack();
    } else {
        //校验未通过返回的错误的提示信息
        callBack(new Error('品牌名称位数大于等于两位'))
    }
}
//品牌LOGO图片的自定义校验规则方法,在下面rules中使用
const validatorLogoUrl = (_rule: any, value: any, callBack: any) => {
    //如果图片上传
    if (value) {
        callBack();
    } else {
        callBack(new Error('LOGO图片务必上传'))
    }
}

//表单校验规则对象
const rules = {
    tmName: [
        //required:这个字段务必校验,表单项前面出来五角星
        //trigger:代表触发校验规则时机[blur、change]
        { required: true, trigger: 'blur', validator: validatorTmName }
    ],
    logoUrl: [
        { required: true, validator: validatorLogoUrl }
    ]
}
//气泡确认框确定按钮的回调
const removeTradeMark = async (id: number) => {
    //点击确定按钮删除已有品牌请求 reqDeleteTrademark,接口,删除品牌(要删除的品牌数据的id)
    let result = await reqDeleteTrademark(id);
    if (result.code == 200) {
        //删除成功提示信息
        ElMessage({
            type: 'success',
            message: '删除品牌成功'
        });
        //再次获取已有的品牌数据
        getHasTrademark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
    } else {
        ElMessage({
            type: 'error',
            message: '删除品牌失败'
        })
    }
}
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>