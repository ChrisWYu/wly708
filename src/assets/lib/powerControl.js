export const powerControlLib = function (level, route) {
    let buttonControl = {};
    let B = 'B'; //基地经理
    let E = 'E'; //访销员
    let W = 'W'; //战区经理
    let WF = 'WF'; //战区负责人
    let D = 'D'; //督导组长
    let DE = 'DE'; //督导组员
    let K = 'K'; //KA组长
    let KE = 'KE'; //KA组员
    let T = 'T'; //电商组长
    let TE = 'TE'; //电商组员
    switch (route) {
        case 'abnormalScanSuperviseList':
            buttonControl = {
                warAssignShow: false,//战区分派
                superviseAssignShow: false,//督导分派
                operatorAssignShow: false,//指派执行人
                exportDataShow: false,//导出数据
                changeOperatorShow: false,//调整执行人
            };
            switch (level) {
                case D: //督导组长
                    buttonControl.warAssignShow = true;
                    buttonControl.superviseAssignShow = true;
                    buttonControl.exportDataShow = true;
                    break;
                case DE: //督导组员
                    buttonControl.changeOperatorShow = true;
                    break;
                case WF: //战区负责人
                    buttonControl.operatorAssignShow = true;
                    buttonControl.changeOperatorShow = true;
                    break;
                default :
                    break;
            }
            break;
        default :
            break;
    }
    return buttonControl;
};