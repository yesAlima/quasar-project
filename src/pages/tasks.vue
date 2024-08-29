<template>
  <div class="kycfont2">
    <div class="q-pa-sm">
      <div class="row q-col-gutter-sm">
        <div class="col-xs-12 col-md-5">
          <q-card style="padding: 3px" flat bordered class="bg-grey-2">
            <q-card-section class="row q-gutter-md">
              <q-input
                class="col-5"
                outlined
                bg-color="white"
                label="VIMS Username"
                v-model="vimUser"
              />
              <q-separator vertical inset />
              <q-input
                class="col-5"
                outlined
                bg-color="white"
                label="VIMS Password"
                v-model="vimPass"
              />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-xs-12 col-md-6">
          <div>
            <q-btn-toggle
              spread
              v-model="model.work_place"
              toggle-color="negative"
              :options="[
                { label: 'Home', value: 'h' },
                { label: 'Office', value: 'o' },
              ]"
            />
            <q-input
              v-if="model.SOB"
              class="q-mt-xs"
              outlined
              readonly
              bg-color="grey-1"
              v-model="model.SOB.name"
            >
              <template v-slot:append>
                <q-avatar size="45px">
                  <img
                    :src="
                      model.SOB.avatar
                        ? model.SOB.avatar
                        : model.SOB.gender == 'male'
                        ? 'male2.png'
                        : 'female2.png'
                    "
                  />
                </q-avatar>
              </template>
            </q-input>
          </div>
        </div>
        <div class="col">
          <div class="column justify-center q-gutter-sm">
            <q-btn flat @click="right = !right" dense icon="menu" />
            <q-btn
              color="teal-8"
              style="padding-top: 15px; padding-bottom: 15px"
              outline
              @click="logout"
              >Logout</q-btn
            >
          </div>
        </div>
      </div>
    </div>
    <q-drawer
      v-model="right"
      show-if-above
      bordered
      side="right"
      content-class="bg-grey-3"
      class="niceScroll"
      :width="$q.platform.is.mobile ? 360 : 360"
    >
      <div class="q-px-xs q-py-xs">
        <div class="q-mb-sm" v-if="$q.platform.is.mobile">
          <div class="row items-center q-gutter-sm">
            <div>
              <q-btn
                outline
                size="md"
                padding="5px"
                icon="fas fa-arrow-left"
                @click="right = false"
              />
            </div>
            <div>Go Back</div>
          </div>
        </div>
        <div class="q-mt-sm q-pa-md">
          <div class="row q-col-gutter-sm">
            <div class="text-h6 text-bold Syne col-12">Add New Task</div>
            <div class="col-12">
              <q-input
                bg-color="white"
                label="Task Date/Time"
                outlined
                readonly
                v-model="model.taskEntryDateTime"
              />
            </div>
            <div class="col-12">
              <q-select
                outlined
                bg-color="white"
                label="Assign To"
                v-model="model.assignTo"
                use-input
                :options="usersOptionsList"
              >
                <template v-if="model.assignTo" v-slot:append>
                  <q-btn round size="sm">
                    <q-avatar size="45px">
                      <img
                        :src="
                          model.assignTo.avatar
                            ? model.assignTo.avatar
                            : model.assignTo.gender == 'male'
                            ? 'male2.png'
                            : 'female2.png'
                        "
                      />
                    </q-avatar>
                  </q-btn>
                </template>
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section avatar>
                      <q-btn round size="sm">
                        <q-avatar size="42px">
                          <img
                            :src="
                              scope.opt.avatar
                                ? scope.opt.avatar
                                : scope.opt.gender == 'male'
                                ? 'male2.png'
                                : 'female2.png'
                            "
                          />
                        </q-avatar>
                      </q-btn>
                    </q-item-section>
                    <q-item-section :style="$store.getters.systemfontStyle">
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-12 relative-position">
              <div
                style="position: absolute; bottom: 8px; right: 8px; z-index: 3"
              >
                <q-btn-toggle
                  v-model="model.task_description_dir"
                  class="q-mx-none border-primary"
                  no-caps
                  size="sm"
                  toggle-color="blue-grey-2"
                  toggle-text-color="black"
                  color="white"
                  text-color="black"
                  :options="[
                    { label: 'Ar', value: 'rtl' },
                    { label: 'En', value: 'ltr' },
                  ]"
                />
              </div>
              <q-input
                :dir="model.task_description_dir"
                outlined
                type="textarea"
                bg-color="white"
                rows="13"
                v-model="model.task_description"
                label="Task Description"
              />
            </div>
            <div class="col-12">
              <q-select
                outlined
                label="Task Group"
                :bg-color="model.task_group ? model.task_group.color : 'white'"
                v-model="model.task_group"
                :options="tasksGroupOptions"
              >
                <template v-slot:option="scope">
                  <q-item
                    v-bind="scope.itemProps"
                    :class="'text-grey-9 bg-' + (scope.opt.color ? scope.opt.color : 'white')"
                  >
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      {{ scope.opt.timeNeeded.count }}
                      {{
                        scope.opt.timeNeeded.unit_of_time == "days"
                          ? " working days"
                          : scope.opt.timeNeeded.unit_of_time
                      }}
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-12">
              <q-select
                outlined
                label="Line Of Business"
                :bg-color="(model.LOB ? (model.LOB.color + '-2') : 'white')"
                v-model="model.LOB"
                :options="lineOfBusiness"
              >
                <template v-slot:option="scope">
                  <q-item
                    v-bind="scope.itemProps"
                    :class="
                      'text-grey-9 bg-' + (scope.opt.color ? (scope.opt.color + '-2') : 'white')
                    "
                  >
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-12">
              <q-select
                outlined
                v-model="model.task_status"
                :options="statusop()"
                label="Task Status"
                :bg-color="
                  model.task_status
                    ? getStatusColor(model.task_status) + '-2'
                    : 'white'
                "
              >
                <template v-slot:option="scope">
                  <q-item
                    v-bind="scope.itemProps"
                    :class="
                      'text-grey-9 bg-' +
                      (scope.opt ? getStatusColor(scope.opt) + '-2' : 'white')
                    "
                  >
                    <q-item-section>
                      <q-item-label>{{ scope.opt }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-12">
              <q-btn
                @click="addNewTask()"
                outline
                color="green-7"
                class="full-width"
                size="md"
                no-caps
                icon="fas fa-plus"
                padding="md"
              />
            </div>
          </div>
        </div>
      </div>
    </q-drawer>
    <div class="q-px-md">
      <div class="q-mb-sm" v-if="$q.platform.is.mobile">
        <q-btn
          outline
          class="full-width"
          label="Open drawer"
          @click="right = true"
        />
      </div>
      <div v-if="!list">
        <q-spinner-dots color="primary" size="5em" />
      </div>
      <div>
        <div class="q-mb-sm">
          <div class="row">
            <div class="col-xs-12 col-md-4">
              <q-btn-toggle
                v-model="viewop"
                class="q-mx-none border-primary"
                no-caps
                spread
                size="lg"
                toggle-color="blue-grey-2"
                toggle-text-color="black"
                color="white"
                text-color="black"
                :options="[
                  { label: 'Pending Tasks', value: 'open' },
                  { label: 'Closed Tasks', value: 'closed' },
                ]"
              />
            </div>
          </div>
        </div>
        <div
          v-for="(listByStatus, listByStatusInd) in listc"
          :key="'listByStatusTable' + listByStatusInd"
          :class="viewop == listByStatusInd ? '' : 'hidden'"
        >
          <q-table
            :key="listByStatusInd"
            class="bg-grey-2 border-grey"
            flat
            dense
            :grid="isgrid"
            :hide-header="isgrid"
            :separator="separator"
            :filter="filter"
            :filter-method="tableFilterMethod"
            :pagination="{
              rowsPerPage: 5,
            }"
            row-key="key"
            title-class="text-h5 text-bold text-negative"
            :title="listByStatusInd == 'open' ? '' : 'Completed Tasks'"
            :rows="listByStatus"
            :columns="tableColumnsFunction(tableColumns, true)"
            :visible-columns="visibleColumns"
          >
            <template style="padding: 0px" v-slot:top-right="props">
              <div
                class="row items-center q-col-gutter-sm justify-center"
                :class="$q.platform.is.mobile ? 'q-py-xs' : 'q-col-gutter-xs'"
              >
                <div class="col-shrink">
                  <q-select
                    v-if="!isgrid"
                    outlined
                    bg-color="white"
                    dense
                    color="secondary"
                    v-model="visibleColumns"
                    :options="tableColumns"
                    :display-value="$q.lang.table.columns"
                    option-value="value"
                    options-cover
                    multiple
                    emit-value
                    map-options
                    style="min-width: 150px"
                  >
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps">
                        <q-item-section>
                          <q-item-label v-html="scope.opt.label"></q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          <q-toggle
                            v-model="visibleColumns"
                            :val="scope.opt.value"
                          />
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
                <div class="col-shrink">
                  <q-select
                    outlined
                    hide-dropdown-icon
                    style="width: 260px"
                    bg-color="white"
                    dense
                    color="primary"
                    v-model="selectedCategories"
                    :display-value="
                      selectedCategories.length == tasksGroupOptions.length
                        ? 'All'
                        : selectedCategories.length +
                          '/' +
                          tasksGroupOptions.length +
                          ' Categories Showing'
                    "
                    :multiple="true"
                    :options="tasksGroupOptions.map((option) => option.label)"
                    label="Filter By Categories"
                    use-input
                    options-cover
                  >
                  </q-select>
                </div>

                <div class="col-shrink">
                  <q-select
                    outlined
                    hide-dropdown-icon
                    style="width: 240px"
                    bg-color="white"
                    dense
                    color="primary"
                    v-model="selectedStatus"
                    :display-value="
                      statusop(null, null, true).length == selectedStatus.length
                        ? 'All'
                        : selectedStatus.length +
                          '/' +
                          statusop(null, null, true).length +
                          ' Status Showing'
                    "
                    :multiple="true"
                    :options="statusop(null, null, true)"
                    label="Filter By Status"
                    use-input
                    options-cover
                  >
                  </q-select>
                </div>
                <div class="col-shrink">
                  <q-input
                    outlined
                    bg-color="white"
                    dense
                    label="Search"
                    color="primary"
                    debounce="300"
                    v-model="filter"
                  >
                  </q-input>
                </div>
                <div class="col-shrink">
                  <q-btn
                    flat
                    round
                    dense
                    class="bg-grey-6 q-ml-xs"
                    icon="archive"
                    @click="
                      exportTable2(
                        tableColumnsFunction(tableColumns, true),
                        listByStatus,
                        'Tasks ' + listByStatusInd + ' excel export'
                      )
                    "
                  />
                </div>
              </div>
            </template>

            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  <div class="text-center">
                    {{ col.label }}
                  </div>
                </q-th>
              </q-tr>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td
                  v-for="(col, colind) in props.cols"
                  :key="col.name"
                  :props="props"
                  :class="[
                    col.name == 'task_group'
                      ? 'bg-' + getTaskGroupColor(props.row.task_group)
                      : '',
                    ,
                    col.name == 'task_status'
                      ? 'bg-' + getStatusColor(col.value) + '-2'
                      : '',
                    col.name == 'task_description' ? 'bg-white' : '',
                  ]"
                  :style="col.style ? col.style : ''"
                >
                  <!-- History Column -->
                  <div class="text-center" v-if="col.name == 'tasks_updates'">
                    <div v-if="col.value">
                      <q-btn
                        outline
                        padding="8px"
                        size="sm"
                        icon="fas fa-history"
                      >
                        <q-badge
                          v-if="col.value"
                          color="primary"
                          text-color="white"
                          floating
                        >
                          {{ Object.keys(col.value).length }}
                        </q-badge>
                        <q-popup-proxy class="niceScroll2">
                          <q-list bordered separator class="niceScroll2">
                            <q-item
                              v-for="(taskhistitem, histitemind) in col.value"
                              :key="'histitem' + histitemind"
                            >
                              <q-item-section
                                style="max-width: 350px; white-space: normal"
                              >
                                <q-item-label>
                                  {{ taskhistitem.label }}
                                </q-item-label>
                                <q-item-label caption>
                                  <div v-if="taskhistitem.caption">
                                    {{ taskhistitem.caption }}
                                  </div>
                                  {{ taskhistitem.datetime }}
                                </q-item-label>
                              </q-item-section>
                              <q-item-section avatar>
                                {{ taskhistitem.user_english_name }}
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-popup-proxy>
                      </q-btn>
                      <div>
                        <div
                          v-if="
                            haveAccess(
                              props.row.task_created_by,
                              props.row.assignTo,
                              props.row.task_status
                            )
                          "
                          class="q-mt-md"
                        >
                          <q-btn
                            padding="3px"
                            flat
                            icon="fas fa-trash"
                            size="sm"
                            @click="deleteTask(props.row.key)"
                          ></q-btn>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Category Column-->
                  <q-btn
                    square
                    style="height: 140px; padding: 0"
                    flat
                    :class="
                      'text-center full-width' +
                      (
                        haveAccess(
                          props.row.task_created_by,
                          props.row.assignTo,
                          props.row.task_status
                        ) ? '' : ' no-pointer-events'
                      )
                    "
                    v-else-if="col.name == 'task_group'"
                  >
                    {{ col.value ? col.value.label : "" }}
                    <q-menu>
                      <q-item
                        :class="'text-grey-9 bg-' + (ggr ? ggr.color : 'white')"
                        v-close-popup
                        @click="
                          props.row.task_group = ggr;
                          saveTask(
                            props.row.key,
                            props.row,
                            'Task Group Changed'
                          );
                        "
                        clickable
                        v-for="(ggr, grindd) in tasksGroupOptions"
                        :key="'tasksGroupOptions' + grindd"
                      >
                        <q-item-section :style="$store.getters.systemfontStyle">
                          <q-item-label>{{ ggr.label }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          {{ ggr.timeNeeded.count }}
                          {{
                            ggr.timeNeeded.unit_of_time == "days"
                              ? " working days"
                              : ggr.timeNeeded.unit_of_time
                          }}
                        </q-item-section>
                      </q-item>
                    </q-menu>
                  </q-btn>

                  <!-- Task Creation Column -->
                  <div v-else-if="col.name == 'tasks_creation'">
                    <div class="text-center" v-if="props.row.tasks_updates">
                      <q-btn
                        outline
                        color="primary"
                        size="11.4px"
                        round
                        :class="
                          haveAccess(
                            props.row.task_created_by,
                            props.row.assignTo,
                            props.row.task_status
                          ) ? '' : 'no-pointer-events'
                        "
                      >
                        <q-avatar size="30px">
                          <img
                            :src="
                              getUserAvatar(
                                props.row.tasks_updates[
                                  Object.keys(props.row.tasks_updates)[0]
                                ]
                              )
                            "
                          />
                        </q-avatar>
                      </q-btn>
                      <div style="font-size: 10px; margin-top: 0px">
                        {{
                          props.row.tasks_updates[
                            Object.keys(props.row.tasks_updates)[0]
                          ].user_english_name
                        }}
                      </div>
                      <div
                        v-html="
                          $moment(
                            props.row.tasks_updates[
                              Object.keys(props.row.tasks_updates)[0]
                            ].datetime,
                            'YYYY-MM-DD hh:mm A'
                          ).format('YYYY-MM-DD<br>hh:mm A')
                        "
                        style="font-size: 10px; margin-top: 1px"
                      ></div>
                    </div>
                  </div>

                  <!-- Last Updated Column -->
                  <div v-else-if="col.name == 'last_updated'">
                    <div
                      class="text-center"
                      v-if="
                        props.row.tasks_updates &&
                        Object.keys(props.row.tasks_updates).length > 1
                      "
                    >
                      <q-btn
                        outline
                        color="primary"
                        size="11.4px"
                        round
                        :class="
                          haveAccess(
                            props.row.task_created_by,
                            props.row.assignTo,
                            props.row.task_status
                          ) ? '' : 'no-pointer-events'
                        "
                      >
                        <q-avatar size="30px">
                          <img
                            :src="
                              getUserAvatar(
                                props.row.tasks_updates[
                                  Object.keys(props.row.tasks_updates)[
                                    Object.keys(props.row.tasks_updates).length - 1
                                  ]
                                ]
                              )
                            "
                          />
                        </q-avatar>
                      </q-btn>
                      <div style="font-size: 10px; margin-top: 0px">
                        {{
                          props.row.tasks_updates[
                            Object.keys(props.row.tasks_updates)[
                              Object.keys(props.row.tasks_updates).length - 1
                            ]
                          ].user_english_name
                        }}
                      </div>
                      <div
                        v-html="
                          $moment(
                            props.row.tasks_updates[
                              Object.keys(props.row.tasks_updates)[
                                Object.keys(props.row.tasks_updates).length - 1
                              ]
                            ].datetime,
                            'YYYY-MM-DD hh:mm A'
                          ).format('YYYY-MM-DD<br>hh:mm A')
                        "
                        style="font-size: 10px; margin-top: 1px"
                      />
                    </div>
                  </div>

                  <!-- Time Lapsed Column -->
                  <div
                    class="text-center"
                    v-else-if="col.name == 'time_lapsed'"
                  >
                    <div
                      v-for="(tlitem, tlind) in getTimeLapsed(
                        props.row.task_closed_datetime,
                        props.row.tasks_updates[
                          Object.keys(props.row.tasks_updates)[0]
                        ].datetime
                      )"
                      :key="'tl' + tlind"
                    >
                      {{ tlitem }}
                    </div>
                  </div>

                  <!-- Status Column -->
                  <q-btn
                    square
                    style="height: 140px; padding: 0"
                    flat
                    :class="
                      'text-center full-width' +
                      (
                        haveAccess(
                          props.row.task_created_by,
                          props.row.assignTo,
                          props.row.task_status
                        ) ? '' : ' no-pointer-events'
                      )
                    "
                    v-else-if="col.name == 'task_status'"
                  >
                    {{ props.row.task_status }}
                    <q-menu>
                      <q-item
                        :class="
                          'text-grey-9 bg-' +
                          (status ? getStatusColor(status) + '-2' : 'white')
                        "
                        v-close-popup
                        @click="
                          props.row.task_status = status;
                          taskUpdated(status, props.row);
                          saveTask(
                            props.row.key,
                            props.row,
                            'Task Status Changed'
                          );
                        "
                        clickable
                        v-for="(status, statusind) in statusop(
                          props.row.task_created_by,
                          props.row.assignTo
                        )"
                        :key="'SSTATUS' + statusind"
                      >
                        <q-item-section :style="$store.getters.systemfontStyle">
                          <q-item-label>{{ status }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-menu>
                    <div
                      v-if="props.row.task_closed_datetime"
                      class="rounded-borders"
                      style="font-size: 11px"
                    >
                      {{ props.row.task_closed_datetime }}
                    </div>
                  </q-btn>

                  <!-- Assign To Column -->
                  <div class="text-center" v-else-if="col.name == 'assignTo'">
                    <div v-if="col.value">
                      <q-btn
                        outline
                        color="primary"
                        size="11.4px"
                        round
                        :class="
                          haveAccess(
                            props.row.task_created_by,
                            props.row.assignTo,
                            props.row.task_status
                          ) ? '' : 'no-pointer-events'
                        "
                      >
                        <q-avatar size="30px">
                          <img :src="getUserAvatar(col.value)"/>
                        </q-avatar>
                      </q-btn>
                      <div style="font-size: 10px; margin-top: 0px">
                        {{ col.value.label }}
                      </div>
                    </div>
                    <q-menu
                      v-if="
                        haveAccess(
                          props.row.task_created_by,
                          props.row.assignTo,
                          props.row.task_status
                        )
                      "
                    >
                      <q-item
                        v-close-popup
                        @click="
                          props.row.assignTo = assignuser;
                          saveTask(
                            props.row.key,
                            props.row,
                            'Assigned To Changed'
                          );
                        "
                        clickable
                        v-for="(assignuser, assignuserind) in usersOptionsList"
                        :key="'assignuser' + assignuserind"
                      >
                        <q-item-section avatar>
                          <q-avatar size="30px">
                            <img :src="getUserAvatar(assignuser)" />
                          </q-avatar>
                        </q-item-section>
                        <q-item-section :style="$store.getters.systemfontStyle">
                          <q-item-label>{{ assignuser.label }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-menu>
                  </div>

                  <!-- Line Of Business Column -->
                  <q-btn
                    square
                    style="height: 140px; padding: 0"
                    flat
                    :class="
                      'text-center full-width text-grey-9 bg-' +
                      (props.row.LOB ? (props.row.LOB.color + '-2') : 'white') +
                      (
                        haveAccess(
                          props.row.task_created_by,
                          props.row.assignTo,
                          props.row.task_status
                        ) ? '' : ' no-pointer-events'
                      )
                    "
                    v-else-if="col.name == 'LOB'"
                  >
                    {{ props.row.LOB.label }}
                    <q-menu>
                      <q-item
                        :key="LOB.value"
                        :class="'text-grey-9 bg-' + (LOB ? (LOB.color + '-2') : 'white')"
                        v-close-popup
                        @click="
                          props.row.LOB = LOB;
                          props.row.lobForm = null;
                          resetLobForm(
                            props.row.key,
                            props.row
                          );
                        "
                        clickable
                        v-for="LOB in lineOfBusiness"
                      >
                        <q-item-section>
                          <q-item-label>{{ LOB.label }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-menu>
                  </q-btn>

                  <!-- LOB Form Column -->
                  <div class="text-center" v-else-if="col.name == 'LOBform'">
                    <q-btn
                      v-if="
                        haveAccess(
                          props.row.task_created_by,
                          props.row.assignTo,
                          props.row.task_status
                        )
                      "
                      outline
                      padding="3px"
                      :color="(props.row.LOB ? (props.row.LOB.color + '-7') : 'white')"
                      :icon="
                        props.row.lobForm ||
                        props.row.premium ||
                        props.row.dates ||
                        props.row.renewal ||
                        props.row.cpr
                          ? 'fas fa-edit'
                          : 'fas fa-plus'
                      "
                      @click="
                        openLOBFormDialog(
                          props.row,
                          props.row.key,
                          props.row.LOB,
                          props.row.lobForm,
                          props.row.premium,
                          props.row.dates,
                          props.row.renewal,
                          props.row.cpr
                        )
                      "
                    />
                  </div>

                  <!-- Activate Genie Column -->
                  <div class="text-center" v-else-if="col.name == 'task_genie'">
                    <q-btn
                      v-if="
                        haveAccess(
                          props.row.task_created_by,
                          props.row.assignTo,
                          props.row.task_status
                        )
                      "
                      @click="activateGenie(props.row)"
                      size="md"
                      outline
                      padding="3px"
                      icon="fas fa-wand-magic-sparkles"
                    />
                  </div>

                  <!-- Task Description Column -->
                  <div
                    class="relative-position"
                    v-else-if="col.name == 'task_description'"
                  >
                    <div
                      :style="
                        props.row.task_description_dir == 'ltr'
                          ? 'position: absolute;right: 5px;top: 5px;z-index: 3;'
                          : 'position: absolute;left: 5px;top: 5px;z-index: 3;'
                      "
                    >
                      <q-btn-toggle
                        v-model="props.row.task_description_dir"
                        :class="
                          'q-mx-none border-primary' +
                          (
                            haveAccess(
                              props.row.task_created_by,
                              props.row.assignTo,
                              props.row.task_status
                            ) ? '' : ' no-pointer-events'
                          )
                        "
                        no-caps
                        dense
                        size="sm"
                        toggle-color="blue-grey-2"
                        toggle-text-color="black"
                        color="white"
                        text-color="black"
                        :options="[
                          { label: 'Ar', value: 'rtl' },
                          { label: 'En', value: 'ltr' },
                        ]"
                      />
                    </div>
                    <q-input
                      :class="
                        haveAccess(
                          props.row.task_created_by,
                          props.row.assignTo,
                          props.row.task_status
                        ) ? '' : 'no-pointer-events'
                      "
                      :readonly="
                        haveAccess(
                          props.row.task_created_by,
                          props.row.assignTo,
                          props.row.task_status
                        )
                          ? false
                          : true
                      "
                      @blur="checkAndUpdateTaskDescription(props.row)"
                      :dir="props.row.task_description_dir"
                      borderless
                      bg-color="transparent"
                      type="textarea"
                      rows="5"
                      input-class="q-pb-md"
                      v-model="props.row.task_description"
                    >
                    </q-input>
                  </div>

                  <!-- Actions Taken Column -->
                  <div
                    class="text-center relative-position"
                    v-else-if="col.name == 'tasks_actions'"
                  >
                    <div
                      :style="
                        props.row.tasks_actions
                          ? 'position:absolute;right:4px;top:4px;z-index:2'
                          : ''
                      "
                    >
                      <q-btn
                        v-if="
                          haveAccess(
                            props.row.task_created_by,
                            props.row.assignTo,
                            props.row.task_status
                          )
                        "
                        size="sm"
                        outline
                        padding="4px"
                        icon="fas fa-plus"
                      >
                        <q-popup-proxy
                          @hide="addNewTaskAction(props.row.key)"
                          ref="taskAction"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-card flat bordered>
                            <q-card-section>
                              <div
                                class="row Syne text-bold items-center q-col-gutter-sm"
                              >
                                <div>Add New</div>
                                <div>
                                  <q-btn-toggle
                                    v-model="taskAction.action_dir"
                                    class="q-mx-none border-primary"
                                    no-caps
                                    size="sm"
                                    toggle-color="blue-grey-2"
                                    toggle-text-color="black"
                                    color="white"
                                    text-color="black"
                                    :options="[
                                      { label: 'Ar', value: 'rtl' },
                                      { label: 'En', value: 'ltr' },
                                    ]"
                                  />
                                </div>
                                <div>Action</div>
                              </div>
                              <q-editor
                                class="q-mt-sm"
                                :dir="taskAction.action_dir"
                                :toolbar="[
                                  [
                                    {
                                      label: $q.lang.editor.align,
                                      icon: $q.iconSet.editor.align,
                                      fixedLabel: true,
                                      list: 'only-icons',
                                      options: [
                                        'left',
                                        'center',
                                        'right',
                                        'justify',
                                      ],
                                    },
                                  ],
                                  [
                                    'bold',
                                    'italic',
                                    'strike',
                                    'underline',
                                    'subscript',
                                    'superscript',
                                  ],
                                  [
                                    'quote',
                                    'unordered',
                                    'ordered',
                                    'outdent',
                                    'indent',
                                  ],
                                ]"
                                v-model="taskAction.action"
                                min-height="15rem"
                              />
                            </q-card-section>
                          </q-card>
                        </q-popup-proxy>
                      </q-btn>
                    </div>
                    <q-scroll-area
                      v-if="props.row.tasks_actions"
                      style="height: 120px; min-width: 100%"
                    >
                      <q-list
                        class="bg-white text-left rounded-borders border-grey"
                        separator
                      >
                        <q-item
                          v-for="(
                            taction, tactionInd
                          ) in getreversetasksactions(props.row.tasks_actions)"
                          :key="'taskaction' + props.row.key + tactionInd"
                        >
                          <q-item-section>
                            <q-item-label>
                              <div
                                style="width: 220px; white-space: normal"
                                :dir="taction.action_dir"
                                v-html="taction.action"
                              />
                            </q-item-label>
                            <q-item-label caption>
                              <div class="row no-wrap q-col-gutter-xs">
                                <div class="col-grow text-left">
                                  {{
                                    $moment(
                                      taction.datetime,
                                      "YYYY-MM-DD hh:mm A"
                                    ).format("DD-MMM-YY HH:mm")
                                  }}
                                </div>
                                <div
                                  v-if="taction.action_by_name"
                                  class="col-shrink text-right"
                                >
                                  {{ taction.action_by_name.split(" ")[0] }}
                                </div>
                              </div>
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-scroll-area>
                  </div>
                  <div class="text-center" v-else>
                    {{ col.value }}
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>

    <q-dialog v-model="lobDialog.flag">
      <lobForm
        v-if="lobDialog.flag"
        @hideDialog="hideDlg()"
        :obj="lobDialog.obj"
        :existingLOB="lobDialog.existingLOB"
        :existingPremium="lobDialog.existingPremium"
        :existingDates="lobDialog.existingDates"
        :existingRenewal="lobDialog.existingRenewal"
        :existingCPR="lobDialog.existingCPR"
        :lob="lobDialog.lob"
        :qkey="lobDialog.qkey"
      />
    </q-dialog>
  </div>
</template>
<script>
import requestsCommon from "../mixins/requestsCommon";
import tasksTableMixin from "../mixins/tasksTableMixin";
import lobForm from "../components/lobForm.vue";
import fbLoginMixin from "../mixins/fbLoginMixin";

export default {
  components: { lobForm },
  watch: {
    "$store.state.userProfile": {
      immediate: true,
      handler(newval) {
        if (newval) {
          this.model.SOB = newval;

          this.model.task_created_by = newval.email;
        }
      },
    },
  },
  mixins: [requestsCommon, tasksTableMixin, fbLoginMixin],
  data() {
    return {
      vimUser: "",
      vimPass: "",
      lobDialog: {
        flag: false,
        obj: null,
        lob: null,
        qkey: null,
        existingLOB: null,
        existingPremium: null,
        existingDates: null,
        existingRenewal: null,
        existingCPR: null,
      },
      viewop: "open",
      allusers: [],
      isgrid: false,
      list: null,
      separator: "cell",
      right: false,
      usersOptionsList: [],
      filter: "",
      model: {
        SOB: null,
        task_created_by: null,
        assignTo: null,

        task_description: null,
        task_description_dir: "ltr",

        task_group: null,
        taskEntryDateTime: null,
        task_closed_datetime: "",
        tasks_updates: [],
        tasks_actions: [],
        requiredSupportiveDocuments: true,
        receivedRequiredSupportiveDocuments: false,
        task_status: "Open",
        LOB: { label: "Motor", value: "4", color: "blue-grey" },
        work_place: "o",
      },
      lineOfBusiness: [
        {
          label: "Fire",
          value: "1",
          color: "orange",
        },
        {
          label: "Marine",
          value: "2",
          color: "cyan",
        },
        {
          label: "Medical",
          value: "3",
          color: "lime",
        },
        {
          label: "Motor",
          value: "4",
          color: "blue-grey",
        },
        {
          label: "Life",
          value: "5",
          color: "red",
        },
        {
          label: "Motor Fleet",
          value: "6",
          color: "blue",
        },
        {
          label: "General",
          value: "7",
          color: "indigo",
        },
        {
          label: "Travel",
          value: "8",
          color: "brown",
        },
        {
          label: "Performance BOND",
          value: "9",
          color: "teal",
        },
      ],
      tasksGroupOptions: [
        {
          label: "Quotation Request",
          color: "pink-2",
          timeNeeded: {
            count: 3,
            unit_of_time: "days",
          },
        },

        {
          label: "Renewal",
          color: "yellow-2",
          timeNeeded: {
            count: 5,
            unit_of_time: "days",
          },
        },
        {
          label: "Issuance",
          color: "orange-2",
          timeNeeded: {
            count: 2,
            unit_of_time: "days",
          },
        },
        {
          label: "Addition",
          color: "green-2",
          timeNeeded: {
            count: 1,
            unit_of_time: "days",
          },
        },
        {
          label: "Deletion",
          color: "brown-2",
          timeNeeded: {
            count: 1,
            unit_of_time: "days",
          },
        },
        {
          label: "Modification",
          color: "purple-2",
          timeNeeded: {
            count: 1,
            unit_of_time: "days",
          },
        },
        {
          label: "Certificate Request",
          color: "teal-2",
          timeNeeded: {
            count: 1,
            unit_of_time: "days",
          },
        },
        {
          label: "Claim",
          color: "amber-2",
          timeNeeded: {
            count: 1,
            unit_of_time: "days",
          },
        },
        {
          label: "Review Quotation",
          color: "blue-2",
          timeNeeded: {
            count: 3,
            unit_of_time: "days",
          },
        },
        {
          label: "Others",
          color: "light-green-2",
          timeNeeded: {
            count: 1,
            unit_of_time: "days",
          },
        },
      ],
      taskAction: {
        action_dir: "ltr",
        action_by: "", //username
        action_by_name: "", //user english name
        datetime: "", //momentjs
        action: "", //list of text
      },
    };
  },
  created() {
    this.getAllUsers();
    this.getTasks();
    this.model.taskEntryDateTime = this.$moment().format("YYYY-MM-DD hh:mm A");
  },
  computed: {
    apiURL2() {
      if (this.model.work_place == "o") return "http://10.10.40.234:9999";
      else return "http://109.161.174.225:999";
    },
    listc() {
      var self = this;
      if (!this.list) return null;
      let list = this.list;

      if (this.$store.getters.isAdmin) {
        var quoteAdmin;
        var isQuoteAdmin = false;
        //check current user is issuance admin
        if (this.$store.state.quoteAdmins)
          for (var itemind in this.$store.state.quoteAdmins) {
            quoteAdmin = this.$store.state.quoteAdmins[itemind];
            if (quoteAdmin.value == this.$store.state.currentuser)
              isQuoteAdmin = true;
          }

        if (!isQuoteAdmin) {
          //let the employees see only thier tasks
          list = self.$_lodash.filter(list, function (o) {
            return (
              o.assignTo.email == self.$store.state.currentuser ||
              o.task_created_by == self.$store.state.currentuser
            );
          });
        }
      }

      if (this.selectedCategories.length != this.tasksGroupOptions.length) {
        list = self.$_lodash.filter(list, function (o) {
          return self.selectedCategories.includes(o.task_group.label);
        });
      }
      if (this.selectedStatus.length != this.statusop().length) {
        list = self.$_lodash.filter(list, function (o) {
          return self.selectedStatus.includes(o.task_status);
        });
      }

      var grlist = this.$_lodash.groupBy(list, function (o) {
        return o.task_status == "Closed" ? "closed" : "open";
      });

      return {
        open: grlist["open"] ? grlist["open"].reverse() : [],
        closed: grlist["closed"]
          ? self.$_lodash
              .orderBy(grlist["closed"], function (o) {
                return self.$moment(
                  o.task_closed_datetime,
                  "YYYY-MM-DD hh:mm A"
                );
              })
              .reverse()
          : [],
      };
    },
  },
  methods: {
    activateGenie(row) {
      let self = this;
      let lobf = {
        ...row.renewal,
        ...row.dates,
        ...row.premium,
        ...row.lobForm,
        CPR: row.cpr,
        vimsip: self.apiURL2,
        username: self.vimUser,
        password: self.vimPass,
        lob: row.LOB.value,
      };
      this.axios.post("http://localhost:8086/addVIMSPolicy", lobf);
    },
    hideDlg() {
      this.lobDialog.flag = false;
    },
    openLOBFormDialog(
      obj,
      qkey,
      lob,
      existingLOB,
      existingPremium,
      existingDates,
      existingRenewal,
      existingCPR
    ) {
      this.lobDialog.flag = true;
      this.lobDialog.lob = lob
      this.lobDialog.qkey = qkey
      this.lobDialog.obj = obj ? obj : null
      this.lobDialog.existingLOB = existingLOB ? existingLOB : null
      this.lobDialog.existingPremium = existingPremium ? existingPremium : null
      this.lobDialog.existingDates = existingDates ? existingDates : null
      this.lobDialog.existingRenewal = existingRenewal ? existingRenewal : null
      this.lobDialog.existingCPR = existingCPR ? existingCPR : null
    },
    selectStatus(status) {
      this.model.task_status = status;
    },
    statusop(task_created_by, task_assigned_to, getalls) {
      if (getalls) {
        return [
          "Open",
          "Closed",
          "Closed - Pending Confirmation",
          "Pending SOB Info",
          "Awaiting Supportive Documents",
        ];
      }
      if (!task_created_by && !task_assigned_to)
        return [
          "Open",
          "Closed",
          "Pending SOB Info",
          "Awaiting Supportive Documents",
        ];

      var allowToClose = false; // only for the user created the quote
      if (task_created_by == this.$store.state.currentuser) allowToClose = true;
      if (allowToClose)
        return [
          "Open",
          "Closed",
          "Pending SOB Info",
          "Awaiting Supportive Documents",
        ];
      else
        return [
          "Open",
          "Closed - Pending Confirmation",
          "Pending SOB Info",
          "Awaiting Supportive Documents",
        ];
    },
    haveAccess(task_created_by, task_assigned_to, task_status) {
      if (task_status == "Closed") return false;
      if (this.$store.getters.isAdmin) return true;
      if (task_created_by == this.$store.state.currentuser) return true;
      if (task_assigned_to) {
        if (
          task_assigned_to.access == "issuenceAdmin" &&
          this.$store.state.quoteAdmins
        ) {
          var quoteAdmin;
          //check current user is issuance admin
          for (var itemind in this.$store.state.quoteAdmins) {
            quoteAdmin = this.$store.state.quoteAdmins[itemind];
            if (quoteAdmin.value == this.$store.state.currentuser) return true;
          }
        } else if (task_assigned_to.email == this.$store.state.currentuser)
          return true;
      }
      return false;
    },
    getreversetasksactions(list) {
      return Object.values(list).reverse();
    },
    getStatusColor(status) {
      if (status == "Open") return "yellow";
      else if (status == "Closed") return "green";
      else if (status == "Closed - Pending Confirmation") return "teal";
      else if (status == "Pending SOB Info" || status == "Pending SOB info")
        return "indigo";
      else if (status == "Awaiting Supportive Documents") return "cyan";
      return "red";
    },
    getTimeLapsed(closed_date, creationdate) {
      const format = "YYYY-MM-DD hh:mm A"; // Define the format of the dates

      // If closed_date is empty, use the current date and time
      const endDate = closed_date
        ? this.$moment(closed_date, format)
        : this.$moment();

      // Parse the creationdate
      const startDate = this.$moment(creationdate, format);

      // Calculate the difference between the dates
      const duration = this.$moment.duration(endDate.diff(startDate));

      // Get the number of days, hours, and minutes from the duration
      const days = duration.days();
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      // Construct the formatted time lapsed string
      let timeLapsed = [];
      if (days > 0) {
        timeLapsed.push(days + " days ");
      }
      if (hours > 0) {
        timeLapsed.push(hours + " hours ");
      }
      if (minutes > 0) {
        timeLapsed.push(minutes + " minutes");
      }

      if (!timeLapsed.length && seconds > 0) {
        timeLapsed.push(seconds + " seconds");
      }

      return timeLapsed; // Remove any trailing whitespace
    },
    getUserInfo(userObj) {
      for (var i = 0; i < this.allusers.length; i++) {
        if (this.allusers[i].email == userObj.email) {
          return this.allusers[i];
        }
      }
      return userObj;
    },
    getUserInfo2(userObj) {
      for (var i = 0; i < this.allusers.length; i++) {
        if (this.allusers[i].email == userObj.username) {
          return this.allusers[i];
        }
      }
      return userObj;
    },
    getUserAvatar(userObj) {
      let obj = this.getUserInfo2(userObj)
      return obj.avatar ? obj.avatar : obj.gender == "male" ? "male2.png" : "female2.png";
    },
    checkAndUpdateTaskDescription(task) {
      if (task.task_description !== task.original_task_description) {
        this.saveTask(
          task.key,
          task,
          "Desc Changed",
          "From: " +
            task.original_task_description +
            "\n To:" +
            task.task_description
        );
      }
    },
    getTaskGroupColor(task_group) {
      for (var i = 0; i < this.tasksGroupOptions.length; i++) {
        if (this.tasksGroupOptions[i].label == task_group.label)
          return this.tasksGroupOptions[i].color;
      }
      return "cyan-2";
    },
    taskUpdated(newstatus, task) {
      if (newstatus == "Closed")
        task.task_closed_datetime = this.$moment().format("YYYY-MM-DD hh:mm A");
      else task.task_closed_datetime = "";
    },
    resetTaskForm() {
      this.model = {
        taskEntryDateTime: this.$moment().format("YYYY-MM-DD hh:mm A"),
        SOB: this.$store.state.userProfile ? this.$store.state.userProfile : "",
        task_created_by: this.$store.state.userProfile
          ? this.$store.state.userProfile.email
          : "",
        assignTo: null,

        task_description: null,
        task_description_dir: "ltr",

        task_group: null,
        task_closed_datetime: "",
        tasks_updates: [],
        tasks_actions: [],
        requiredSupportiveDocuments: true,
        receivedRequiredSupportiveDocuments: false,
        task_status: "Open",
        LOB: { label: "Motor", value: "4", color: "blue-grey" },
        work_place: "o",
      }
    },
    deleteTask(task_id) {
      var self = this;
      self.loading();
      this.db.ref("/tasks/" + task_id).set(null, function (error) {
        if (error) {
          self.fnotify(error.message);
        } else {
          self.snotify("Tasks deleted Successfully");
        }
        self.hideloading();
      });
    },
    updatetaskcreation(usercreated, task_id) {
      this.db.ref("/tasks/" + task_id).update(
        {
          task_created_by: usercreated,
        },
        function (error) {
          if (error) {
            self.hideloading();
            self.fnotify("Error");
          } else {
            self.hideloading();
            self.snotify("Done");
          }
        }
      );
    },
    saveTask(task_id, taskObj, action_label, action_caption) {
      var self = this;
      this.db.ref("/tasks/" + task_id).set(taskObj, function (error) {
        if (error) {
          self.fnotify(error.message);
        } else {
          self.snotify("Tasks updated Successfully");
          self.addTaskUpdate(task_id, action_label, action_caption);
          if (action_label == "Assigned To Changed") {
            if (taskObj.assignTo)
              self.addNotification(
                "Tasks Assignment just updated to you",
                taskObj.assignTo.email,
                taskObj.assignTo.access == "issuenceAdmin" ? true : false,
                taskObj
              );
          }
        }
        self.hideloading();
      });
    },
    resetLobForm(key, Obj) {
      var self = this;
      Obj.lobForm = null
      this.db.ref("/tasks/" + key).set(Obj, function (error) {
        if (error) {
          self.fnotify(error.message);
        } else {
          self.snotify("Tasks updated Successfully")
        }
        self.hideloading();
      })
    },
    getTasks() {
      var self = this;
      this.db
        .ref("/tasks")
        .limitToLast(500)
        .on(
          "value",
          (snapshot) => {
            if (snapshot.val()) {
              self.list = self.$_lodash.map(snapshot.val(), (value, key) => ({
                ...value,
                original_task_description: value.task_description
                  ? value.task_description.slice(0)
                  : "",
                key: key,
              }));
            } else self.list = null;
            self.hideloading();
          },
          (error) => {
            self.fnotify(error.message);
            self.hideloading();
          }
        );
    },
    resetTaskActionForm() {
      this.taskAction = {
        action_dir: "ltr",
        action_by: "", //username
        action_by_name: "", //user english name
        datetime: "", //momentjs
        action: "", //list of text
      };
    },
    addNewTaskAction(taskId) {
      if (!this.taskAction.action) return;
      if (!taskId) return;
      this.taskAction.action_by = this.$store.state.currentuser
        ? this.$store.state.currentuser
        : "";
      this.taskAction.action_by_name =
        this.$store.state.userProfile && this.$store.state.userProfile.name
          ? this.$store.state.userProfile.name
          : "";
      this.taskAction.datetime = this.$moment().format("YYYY-MM-DD hh:mm A");

      var newRequestKey = this.db
        .ref("/tasks/" + taskId + "/tasks_actions")
        .push().key;
      var self = this;
      this.db
        .ref("/tasks/" + taskId + "/tasks_actions/" + newRequestKey)
        .set(self.taskAction, function (error) {
          if (error) {
            self.fnotify(error.message);
          } else {
            self.snotify("Tasks Action added Successfully");
            self.resetTaskActionForm();
            self.addTaskUpdate(taskId, "Action Added");
          }
          self.hideloading();
        });
    },
    getAllUsers() {
      var self = this;
      this.db.ref("/users").once(
        "value",
        (snapshot) => {
          if (snapshot.val()) {
            self.allusers = self.$_lodash.map(snapshot.val(), (value, key) => ({
              key: key,

              label: value.name, // value.arname + " " +
              avatar: value.avatar,
              gender: value.gender,
              email: value.email,
              access: value.access,
              userStatus: value.userStatus,
            }));
            var usersOptionsList = self.$_lodash.map(
              snapshot.val(),
              (value, key) => ({
                key: key,

                label: value.name,
                avatar: value.avatar,
                gender: value.gender,
                email: value.email,
                access: value.access,
                userStatus: value.userStatus,
              })
            );

            self.usersOptionsList = self.$_lodash.filter(
              usersOptionsList,
              function (o) {
                return (
                  (o.access == "staff" || o.access == "issuenceAdmin") &&
                  o.userStatus != "disable"
                );
              }
            );
          } else self.fnotify("No user found");
        },
        (error) => {
          self.fnotify(error.message);
        }
      );
    },
    addTaskUpdate(task_id, label, action_caption) {
      // this.model.tasks_updates.push();

      var newRequestKey = this.db
        .ref("/tasks/" + task_id + "/tasks_updates")
        .push().key;

      var self = this;
      this.db.ref("/tasks/" + task_id + "/tasks_updates/" + newRequestKey).set(
        {
          label: label,
          caption: action_caption ? action_caption : null,
          ...this.updateInfo(),
        },
        function (error) {
          if (error) {
            self.fnotify(error.message);
          } else {
            self.snotify("Tasks action log added Successfully");
          }
          self.hideloading();
        }
      );
    },
    updateInfo() {
      return {
        username: this.$store.state.currentuser
          ? this.$store.state.currentuser
          : "",
        user_english_name:
          this.$store.state.userProfile && this.$store.state.userProfile.name
            ? this.$store.state.userProfile.name
            : "",
        timeStampSTD: this.StartOfDayTStamp(),
        timeStamp: new Date().getTime(),
        datetime: this.$moment().format("YYYY-MM-DD hh:mm A"),
      };
    },
    addNewTask() {
      var self = this;

      if (!this.model.assignTo)
        this.fnotify("You didn't select a person to assign to");
      if (!this.model.task_description)
        this.fnotify("You didn't add a task description");
      if (!this.model.task_group)
        this.fnotify("You didn't select the task group");
      if (!this.model.task_status)
        this.fnotify("You didn't select the status of the task");

      if (
        !this.model.task_status ||
        !this.model.assignTo ||
        !this.model.task_description ||
        !this.model.task_group
      )
        return;

      var newRequestKey = this.db.ref("/tasks").push().key;
      this.model.tasks_updates.push({
        label: "Task Created",
        caption: newRequestKey,
        ...this.updateInfo(),
      });
      if (newRequestKey) {
        this.db
          .ref("/tasks/" + newRequestKey)
          .set(self.model, function (error) {
            if (error) {
              self.fnotify(error.message);
            } else {
              self.snotify("Tasks Added Successfully");
              // if (self.model.assignTo)
              //   self.addNotification(
              //     "New Task Added For You",
              //     self.model.assignTo.email,
              //     self.model.assignTo.access == "issuenceAdmin" ? true : false,
              //     self.model
              //   );
              self.resetTaskForm();
            }
            self.hideloading();
          });
      }
    },
    addNotification(title, sendTo, issuenceAdmin, task) {
      var self = this;
      if (!sendTo) return;
      if (issuenceAdmin) {
        var updates = {};
        var quoteAdmin;
        var notificationInfo;
        for (var itemind in this.$store.state.quoteAdmins) {
          quoteAdmin = this.$store.state.quoteAdmins[itemind];
          notificationInfo = {
            title: title,
            details: {
              title: title,
              cr: task && task.cr ? task.cr : null,
              caption:
                task && task.task_description ? task.task_description : "",
              // cr: this.subsidiaryCompanies[this.mainSub].crPlain,
              // companyName: this.subsidiaryCompanies[this.mainSub].companyName,
              // coverKey: lead.cover,
              // cover: this.getcoverLabel(lead.cover),
              // dateOfExpiry: lead.dateOfExpiry,
            },
            sendTo: quoteAdmin.value,
            sendToName: quoteAdmin.label,
            sendFrom: this.$store.state.currentuser
              ? this.$store.state.currentuser
              : "",
            sendFrom_english_name:
              this.$store.state.userProfile &&
              this.$store.state.userProfile.name
                ? this.$store.state.userProfile.name
                : "",
            timeStampSTD: this.StartOfDayTStamp(),
            timeStamp: new Date().getTime(),
            datetime: this.$moment().format("YYYY-MM-DD hh:mm A"),
          };
          updates[this.db.ref("/notification").push().key] = notificationInfo;
        }
        if (Object.keys(updates).length) {
          this.db.ref("/notification").update(updates, function (error) {
            if (error) {
              self.hideloading();
              self.fnotify("Error Sending Notification");
            } else {
              self.hideloading();
              self.snotify(
                "Notification Sent to Issuance Admins: " +
                  self.$store.state.quoteAdmins
                    .map((option) => option.label)
                    .toString()
              );
            }
          });
        }
      } else {
        //send notification
        var newRequestKey2 = this.db.ref("/notification").push().key;
        var notificationInfo = {
          title: title,
          titleColor: "indigo",
          details: {
            title: this.model.task_group,
            cr: task && task.cr ? task.cr : null,
            caption: task && task.task_description ? task.task_description : "",
          },
          sendTo: sendTo, //user.value,
          // sendToName: user.label,
          sendFrom: this.$store.state.currentuser
            ? this.$store.state.currentuser
            : "",
          sendFrom_english_name:
            this.$store.state.userProfile && this.$store.state.userProfile.name
              ? this.$store.state.userProfile.name
              : "",
          timeStampSTD: this.StartOfDayTStamp(),
          timeStamp: new Date().getTime(),
          datetime: this.$moment().format("YYYY-MM-DD hh:mm A"),
        };

        this.db
          .ref("/notification/" + newRequestKey2)
          .set(notificationInfo, function (error) {
            if (error) {
              self.hideloading();
              self.fnotify("Error Sending Notification");
            } else {
              self.hideloading();
              self.snotify("Notification Sent");
            }
          });
      }
    },
  },
};
</script>
