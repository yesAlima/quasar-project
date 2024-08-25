export default {
    data() {
        return {
            pagination: {
                rowsPerPage: 5,
            },
            selectedStatus:[],
            selectedCategories:[],
            visibleColumns:[],
            tableColumns: [
                {
                  label: "History",
                  value: "tasks_updates",
                  style:"width:50px"
                },
                {
                  label: "Category",
                  value: "task_group",
                  style:"width:90px;white-space:normal"
                },
                {
                  label: "Task Creation",
                  value: "tasks_creation",
                  style:"width:60px"
                },
                {
                  label: "Last Updated",
                  value: "last_updated",
                  style:"width:60px"
                },
                {
                  label: "Time Lapsed",
                  value: "time_lapsed",
                  style:"width:90px;white-space:normal"
                },
                {
                  label: "Status",
                  value: "task_status",
                  style:"width:70px;white-space:normal"
                },
                {
                  label: "Assign To",
                  value: "assignTo",
                  style:"width:60px;white-space:normal"
                },
                {
                  label: "Line Of Business",
                  value: "LOB",
                  style:"width:70px;white-space:normal"
                },
                {
                  label: "LOB Form",
                  value: "LOBform",
                  style:"width:70px;white-space:normal"
                },
                {
                  label: "Activate Genie",
                  value: "task_genie",
                  style: "width:70px;white-space:normal"
                },
                {
                  label: "Task Description",
                  value: "task_description",
                },
                {
                  label: "Actions Taken",
                  value: "tasks_actions",
                  style:"width:300px;white-space:normal"
                }
            ],
        }
    },
    created(){
        var list=[]
        for (var i = 0; i < this.tableColumns.length; i++)
        list.push( this.tableColumns[i].value)
        this.visibleColumns=list

        this.selectedCategories=this.tasksGroupOptions.map((option) => option.label)
        this.selectedStatus=this.statusop(null,null,true).slice(0)

    },
    methods:{
        tableColumnsFunction(list, notSortable) {
            var columns = [];
            for (var i = 0; i < list.length; i++) {
              columns.push({
                label: list[i].label,
                name: list[i].value,
                field: list[i].value,
                sortable: notSortable ? false : true,
                style: list[i].style ? list[i].style : "",
                class: list[i].class ? list[i].class : "",
              });
            }
            return columns;
          },
          tableFilterMethod(rows, terms, cols, getCellValue) {
            const lowerTerms = terms ? terms.toLowerCase().trim() : "";
            return rows.filter(
              (row) =>
                JSON.stringify(row).toLowerCase().trim().indexOf(lowerTerms) !== -1
            );
          },
    }
}
