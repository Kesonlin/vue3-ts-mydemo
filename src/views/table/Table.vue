<template>
    <table id="lcc-table" border="1" width="100%" height="100%">
        <tr>
            <th rowspan="3">项目编号</th>
            <th rowspan="3">项目名称</th>
            <th rowspan="3">项目建设地区</th>
            <th colspan="6">全生命周期成本（万元）</th>
            <th colspan="7">缺供电量收益（万元）</th>
        </tr>
        <tr>
            <th rowspan="2">初始投资成本</th>
            <th rowspan="2">运行成本</th>
            <th rowspan="2">维护成本</th>
            <th colspan="2">退役成本</th>
            <th rowspan="2">总LCC成本</th>
            <th rowspan="2">社会效益</th>
            <th rowspan="2">停电损失收益</th>
            <th rowspan="2">负荷报装收益</th>
            <th rowspan="2">总效益（不含社会效益）</th>
            <th rowspan="2">总收益（ 含社会效益）</th>
            <th rowspan="2">单位效益（不含社会效益）</th>
            <th rowspan="2">单位效益（含社会效益）</th>
        </tr>
        <tr>
            <td>工程主体退役成本</td>
            <td>关联工程拆除费用</td>
        </tr>

        <tr v-for="(item, index) in desserts" :key="index">
            <th v-for="(items, index, i) in item" :key="index">
                <template v-if="i == 0">
                    <v-checkbox v-model="chooseId" :label="item[customValue[i]]" :value="item[customValue[i]]">
                    </v-checkbox>
                </template>
                <template v-else>
                    {{ item[customValue[i]] }}
                </template>

            </th>
        </tr>

    </table>
</template>

<script setup lang='ts'>


</script>

<style lang='scss'>

</style>