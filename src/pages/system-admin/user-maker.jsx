import PropTypes from "prop-types"

import { Paper, Button, Card, TextField, FormControl, InputLabel, Select, MenuItem, Stack, IconButton, Snackbar, Alert, Slide } from "@mui/material"

import TableCell from '@mui/material/TableCell';
import PageWrapper from "../../components/page-wrapper"
import DataTable from "../../components/table/data-table"
import { useEffect, useState } from "react";

import axios from "axios";
import { baseUrl } from "../../Config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useAuth } from "../../context/authProvider";
import { faEdit, faEraser, faEye, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ViewDialog from "../../components/view-dialog";
import EditDialog from "../../components/edit-dialog";
import { areSame, convertToTitleCase, filterItems } from "../../utils";

function TransitionTop(props) {
    return <Slide {...props} direction="center" />;
}

const headCells = [
    {
        id: 'userId',
        numeric: true,
        disablePadding: true,
        label: 'User Id',
    },
    {
        id: 'userName',
        numeric: false,
        disablePadding: false,
        label: 'User Name',
    },
    {
        id: 'adminFlag',
        numeric: false,
        disablePadding: false,
        label: 'Admin Flag',
    },
    {
        id: 'disableFlag',
        numeric: false,
        disablePadding: false,
        label: 'Disable Flag',
    },
    {
        id: 'employeeNo',
        numeric: true,
        disablePadding: false,
        label: 'Employee No',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Action',
    },
];

function convertToUserFormat(item) {
    return {
        userId: item.userId,
        userName: item.userName,
        adminFlag: item.adminFlag,
        disableFlag: item.userDisableFlag,
        employeeNo: item.employeeNo,
        status: item.authStatus,
        branchName: item.branchCd,
        role: `role ${item.userRoleId}`,
        emailId: item.emailId,
        validUpto: item.validUpto,
        activeFlag: item.userActiveFlag,
        mobileNo: item.mobileNo,
        remark: item.remark,
        maker: item.makerCd,
        makerDate: item.makerDt,
        author: item.authorCd,
        authorDate: item.authorDt,
    };
}

function convertToEditUserFormat(item) {
    return {
        userId: item.userId,
        userName: item.userName,
        adminFlag: item.adminFlag,
        userDisableFlag: item.userDisableFlag,
        employeeNo: item.employeeNo,
        branchCd: item.branchCd,
        userRoleId: item.userRoleId,
        emailId: item.emailId,
        validUpto: item.validUpto,
        userActiveFlag: item.userActiveFlag,
        mobileNo: item.mobileNo,
        remark: item.remark,
        makerCd: item.makerCd,
        makerDt: item.makerDt,
        authorCd: item.authorCd,
        authorDt: item.authorDt,
    };
}
const fetchUserList = async (authToken) => {
    const response = await axios.post(`${baseUrl}/userMaster/populate`, {
        "source": "A",
        "makerCd": "pramodk"
    }, {
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    });
    return response.data;
};
const addUpdateUser = async (authToken, data) => {
    const res = await axios.post(`${baseUrl}/userMaster/newOrUpdate`, data, {
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    });
    return res.data
}

const initialFilters = {
    userId: "",
    userName: "",
    authStatus: "",
    branchCd: ""
}

function UserMakerPage({ title = "User Master - Maker" }) {
    const [selected, setSelected] = useState([]);  // for data-table
    const [filters, setFilters] = useState(initialFilters)
    const [items, setItems] = useState([])
    const [filteredRows, setFilteredRows] = useState([])
    const { authToken } = useAuth();
    const [transition, setTransition] = useState(undefined);
    const [isWarnBarOpen, setIsWarnBarOpen] = useState(false)
    const [warningMessage, setWarningMessage] = useState("");
    const { isPending, isError, data, error, refetch } = useQuery({
        queryKey: ['populateUserList'],
        queryFn: async () => await fetchUserList(authToken),

        // retryOnMount: false
    })
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (data) => addUpdateUser(authToken, data),
        onSuccess: (data) => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['populateUserList'] })
            Swal.fire("Success", data.success, "success");
        },
    })

    // handling view and edit dialog's
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [newDialogOpen, setNewDialogOpen] = useState(false);

    const closeViewDialog = () => setViewDialogOpen(false);
    const closeEditDialog = () => setEditDialogOpen(false);
    const closeNewDialog = () => setNewDialogOpen(false);

    const [selectedRowData, setSelectedRowData] = useState(null); // State to store the selected row data
    const [selectedRowDataEdit, setSelectedRowDataEdit] = useState(null); // State to store the selected row data
    const [selectedRowDataEditCompare, setSelectedRowDataEditCompare] = useState(null);
    // Effect to handle data conversion when data changes
    useEffect(() => {
        if (data?.userMaster) {
            const userList = data.userMaster; // convertToUserFormat(data.userMaster);
            setItems(userList)
            setFilteredRows(userList)
        }
    }, [data]);

    const handleCloseWarn = () => {
        setIsWarnBarOpen(false)
    }
    // warning - snackbar open
    const handleClickWarn = (Transition, warnMsg) => {
        setTransition(() => Transition);
        setIsWarnBarOpen(true);
        setWarningMessage(warnMsg);
    };
    const handleEditDataSubmit = () => {
        if (areSame(selectedRowDataEdit, selectedRowDataEditCompare)) {
            handleClickWarn(
                TransitionTop,
                "No changes have been made. There is nothing to update."
            );
            return;
        }
        selectedRowDataEdit["source"] = "M"
        selectedRowDataEdit["authStatus"] = "M"
        mutation.mutate(selectedRowDataEdit)
        closeEditDialog()
    }
    const handleNewDataSubmit = () => {
        console.log("new record create");
    }
    const handleAction = (e, actionType, row) => {
        e.stopPropagation() // Prevents the event from reaching TableRow
        if (actionType === "edit") {
            setSelectedRowDataEdit(row)
            setSelectedRowDataEditCompare(row)
            setEditDialogOpen(true)
        } else if (actionType === "view") {
            setViewDialogOpen(true);
            setSelectedRowData(row)
        }
    }
    const handleNewRecord = () => {
        setNewDialogOpen(true);
    }
    const handleFilterInputs = (e) => {
        setFilters(pre => (
            {
                ...pre,
                [e.target.name]: e.target.value
            }
        ))
    }
    const handleFilterSubmit = (e) => {
        e.preventDefault();
        const filteredRows = filterItems(items, filters)
        setFilteredRows(filteredRows)
    }
    const clearFilters = () => {
        setFilteredRows(items)
        setFilters(initialFilters)
    }

    const handleEditInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        console.log({ name, value });

        setSelectedRowDataEdit(pre => ({
            ...pre,
            [name]: value
        }))
    }

    const renderTableRow = (tableRow, labelId) => {
        return <>
            <TableCell
                component="th"
                id={labelId}
                scope="tableRow"
                align="left"
            // padding={selectable ? "none" : "normal"}
            >
                {tableRow.userId}
            </TableCell>
            <TableCell align="left">{tableRow.userName}</TableCell>
            <TableCell align="left">{tableRow.adminFlag}</TableCell>
            <TableCell align="left">{tableRow.userDisableFlag}</TableCell>
            <TableCell align="left">{tableRow.employeeNo}</TableCell>
            <TableCell align="left">{tableRow.authStatus}</TableCell>
            <TableCell align="center" className="action-cell" onClick={e => e.stopPropagation()} >
                <IconButton size="small" className="edit-button"
                    onClick={(e) => handleAction(e, "edit", tableRow)}
                >
                    <FontAwesomeIcon
                        className="edit-icon"
                        size="1x"
                        icon={faEdit}
                    />
                </IconButton>
                <IconButton size="small" className="view-button"
                    onClick={(e) => handleAction(e, "view", tableRow)}
                >
                    <FontAwesomeIcon
                        className="view-icon"
                        size="1x"
                        icon={faEye}
                    />
                </IconButton>
            </TableCell>
        </>
    }
    const renderViewData = () => {
        if (!selectedRowData) return null;
        const transformedToView = convertToUserFormat(selectedRowData)
        return Object.entries(transformedToView).map(([key, value]) => {

            if (key === "role" || key === "adminFlag" || key === "disableFlag" || key === "activeFlag" || key === "branchName") {
                if (key === "branchName") value = data.getBranchNameList?.find(branch => branch.branchCd === value)["branchName"]
                return (
                    <div className="col-md-4" key={key}>
                        <FormControl className="mb-3" size="small" fullWidth>
                            <InputLabel id="status">{key}</InputLabel>
                            <Select
                                id="status"
                                label={key}
                                value={value === "" ? " " : value}
                                disabled
                                size="small"
                            >
                                <MenuItem value={value}>{value}</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                )
            }
            if (key === "remark") {
                return (
                    <div className="col-md-12" key={key}>
                        <FormControl key={key} className="mb-3" size="small" fullWidth>
                            <TextField
                                label={key}
                                value={value || ""}
                                multiline
                                rows={2}  // Sets the number of visible rows in the textarea
                                size="small"
                                disabled
                            />
                        </FormControl>
                    </div>
                )
            }
            if (key === "maker" || key === "author" || key === "makerDate" || key === "authorDate") {
                const fieldName = convertToTitleCase(key)
                return <p className="col-md-6 text-danger m-0" key={key}><span>{fieldName}</span>: <span>{value || `No ${fieldName}`}</span> </p>
            }
            return (
                <div className="col-md-4" key={key}>
                    <FormControl className="mb-3" size="small" fullWidth>
                        <TextField
                            label={key}
                            value={value || ""}
                            size="small"
                            disabled
                        />
                    </FormControl>
                </div>
            )
        })

    }
    const renderEditData = () => {
        if (!selectedRowDataEdit) return null;
        const transformedToEdit = convertToEditUserFormat(selectedRowDataEdit)

        const branchSelectItems = data.getBranchNameList.map((branch, index) => <MenuItem key={index} value={branch.branchCd}>{branch.branchName}</MenuItem>);
        const roleSelectItems = data.getRoleMap.map((role, index) => <MenuItem key={index} value={role.role_ID}>{role.role_DESC}</MenuItem>);
        const adminFlagSelectItems = ["Yes", "No"].map((admin, index) => <MenuItem key={index} value={admin === "Yes" ? "Y" : "N"}>{admin}</MenuItem>);
        const disableFlagSelectItems = ["Enable", "Disable"].map((disableFlag, index) => <MenuItem key={index} value={disableFlag === "Enable" ? "Y" : "N"}>{disableFlag}</MenuItem>);
        const activeFlagSelectItems = ["Yes", "No"].map((activeFlag, index) => <MenuItem key={index} value={activeFlag === "Yes" ? "Y" : "N"}>{activeFlag}</MenuItem>);


        let selectItems = null;

        return Object.entries(transformedToEdit).map(([key, value]) => {
            const fieldName = convertToTitleCase(key)
            let display_label = "";
            let display_value = ""
            if (key === "userRoleId" || key === "adminFlag" || key === "userDisableFlag" || key === "activeFlag" || key === "branchCd" || key === "userActiveFlag") {

                if (key === "branchCd") {
                    selectItems = branchSelectItems;
                    display_label = convertToTitleCase("branchName")
                    value = data.getBranchNameList?.find(branch => branch.branchCd === value)["branchCd"]
                    display_value = value;
                }

                if (key === "userRoleId") {
                    selectItems = roleSelectItems;
                    display_label = convertToTitleCase("Role")
                    const role = data.getRoleMap?.find(role => role["role_ID"] === value)
                    display_value = role ? role["role_DESC"] : ""
                }
                else if (key === "adminFlag") {
                    selectItems = adminFlagSelectItems;
                    display_label = convertToTitleCase(key)
                    display_value = value;
                }
                else if (key === "userDisableFlag") {
                    selectItems = disableFlagSelectItems;
                    display_label = convertToTitleCase("disableFlag")
                    display_value = value;
                }
                else if (key === "userActiveFlag") {
                    selectItems = activeFlagSelectItems;
                    display_label = convertToTitleCase("activeFlag")
                    display_value = value;
                }

                return (
                    <div className="col-md-4" key={key}>
                        <FormControl className="mb-3" size="small" fullWidth>
                            <InputLabel id={key}>{display_label}</InputLabel>
                            <Select
                                id={key}
                                label={display_label}
                                value={selectedRowDataEdit[key]}
                                size="small"
                                onChange={handleEditInputs}
                                name={key}
                            >
                                {
                                    selectItems
                                }
                            </Select>
                        </FormControl>
                    </div>
                )
            }
            if (key === "remark") {
                display_label = convertToTitleCase(key)
                return (
                    <div className="col-md-12" key={key}>
                        <FormControl key={key} className="mb-3" size="small" fullWidth>
                            <TextField
                                label={display_label}
                                value={selectedRowDataEdit[key] === null ? "" : selectedRowDataEdit[key]}
                                multiline
                                rows={2}  // Sets the number of visible rows in the textarea
                                size="small"
                                name={key}
                                onChange={handleEditInputs}
                            />
                        </FormControl>
                    </div>
                )
            }
            if (key === "makerCd" || key === "authorCd" || key === "makerDt" || key === "authorDt") {
                return <p className="col-md-6 text-danger m-0" key={key}><span>{fieldName}</span>: <span>{value || `No ${fieldName}`}</span> </p>
            }
            return (
                <div className="col-md-4" key={key}>
                    <FormControl className="mb-3" size="small" fullWidth>
                        <TextField
                            label={fieldName}
                            value={selectedRowDataEdit[key]}
                            size="small"
                            name={key}
                            onChange={handleEditInputs}
                            disabled={key === "userId"}
                        />
                    </FormControl>
                </div>
            )
        })
    }
    const renderNewData = () => {

    }

    // only for debug purpose
    useEffect(() => {
        console.log(selectedRowDataEdit);
    }, [selectedRowDataEdit])

    if (isError) {
        Swal.fire({
            icon: "error",
            text: error.message || "Something went worng",
        });
        return (
            <Card variant="outlined" sx={{ height: "calc(100% - 24px) !important", padding: "2rem", gap: "1rem", marginTop: "24px", display: "grid", placeItems: "center" }}>
                <div className="text-center">
                    <h5>{error.message || "Something went worng"}</h5>
                </div>
                <Button variant="outlined" onClick={() => refetch()}>Retry</Button>
            </Card>
        )
    }
    if (isPending) {
        return <Card variant="outlined" sx={{ height: "calc(100% - 24px) !important", padding: "2rem", gap: "1rem", marginTop: "24px", display: "grid", placeItems: "center" }}>
            <div className="text-center">
                <h5>Loading ...</h5>
            </div>
        </Card>
    }
    return (
        <PageWrapper>
            <Stack spacing={4}>
                <Paper variant="outlined" className="p-2 " sx={{ backgroundColor: "#d8107b", color: "white" }}>
                    <h5 className="text-center m-0">{title}</h5>
                </Paper>
                <Paper variant="outlined" className=" p-4">
                    <Stack direction={"column"} spacing={4}>
                        <form onSubmit={handleFilterSubmit}>
                            <Stack spacing={2} direction="row">
                                <TextField
                                    id="user_id"
                                    label="User Id"
                                    name="userId"
                                    value={filters.userId}
                                    onChange={handleFilterInputs}
                                    fullWidth size="small"
                                />
                                <TextField
                                    id="username"
                                    label="User Name"
                                    name="userName"
                                    value={filters.userName}
                                    onChange={handleFilterInputs}
                                    fullWidth size="small"
                                />
                                <FormControl fullWidth size="small">
                                    <InputLabel id="status">Status</InputLabel>
                                    <Select
                                        labelId="status"
                                        id="status"
                                        value={filters.authStatus}
                                        label="Status"
                                        name="authStatus"
                                        onChange={handleFilterInputs}
                                    >
                                        <MenuItem value={"all"}>All</MenuItem>
                                        <MenuItem value={"new"}>New</MenuItem>
                                        <MenuItem value={"authorized"}>Authorized</MenuItem>
                                        <MenuItem value={"modified"}>Modified</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="branch_name">Branch Name</InputLabel>
                                    <Select
                                        labelId="branch_name"
                                        id="branch_name"
                                        value={filters.branchCd}
                                        label="Branch Name"
                                        name="branchCd"
                                        onChange={handleFilterInputs}
                                    >
                                        <MenuItem value={"all"}>All</MenuItem>
                                        {
                                            data.getBranchNameList?.map((branch, index) => {
                                                return <MenuItem key={index} value={branch.branchCd}>{branch.branchName}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                {/* action buttons */}
                                <Stack direction={"row"} spacing={2}  >
                                    <Button
                                        variant="outlined"
                                        onClick={clearFilters}
                                        sx={{
                                            width: "95px",
                                        }}
                                        size="small"
                                    >
                                        <FontAwesomeIcon icon={faEraser} />{" "}
                                        <span className="search-icon">Clear</span>
                                    </Button>
                                    <Button variant="contained" type="submit" sx={{
                                        width: "95px"
                                    }}
                                        size="small" >
                                        <FontAwesomeIcon icon={faSearch} />{" "}
                                        <span className="search-icon">Search</span>
                                    </Button>
                                </Stack>
                            </Stack>
                        </form>
                        <div className="d-flex justify-content-end">
                            <Button
                                variant="contained"
                                size="small"
                                color="info"
                                sx={{}}
                                onClick={handleNewRecord}
                            >
                                <FontAwesomeIcon icon={faPlus} />{" "}
                                <span className="search-icon">Add New Record</span>
                            </Button>
                        </div>
                    </Stack>
                </Paper>
                <DataTable
                    rows={filteredRows}
                    headCells={headCells}
                    selected={selected}
                    setSelected={setSelected}
                    selectable={false}
                    renderTableRow={renderTableRow}
                    sx
                />
            </Stack>
            <ViewDialog
                title="User Maker"
                onClose={closeViewDialog}
                open={viewDialogOpen}
                renderViewData={renderViewData}
            />
            <EditDialog
                title="User Maker"
                onClose={closeEditDialog}
                open={editDialogOpen}
                renderEditData={renderEditData}
                handleDataSubmit={handleEditDataSubmit}
                mutation={mutation}
                toUpdate={true}
            />
            <EditDialog
                title="User Maker"
                onClose={closeNewDialog}
                open={newDialogOpen}
                renderEditData={renderNewData}
                handleDataSubmit={handleNewDataSubmit}
                mutation={mutation}
                toUpdate={false}
            />
            {/* snackbar for warning messages */}
            <Snackbar
                open={isWarnBarOpen}
                autoHideDuration={5000}
                onClose={handleCloseWarn}
                TransitionComponent={transition}
                key={transition ? transition.name : ""}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleCloseWarn}
                    severity="warning"
                    sx={{ width: "100%", marginTop: "8px", fontWeight: "bold" }}
                >
                    {warningMessage}
                </Alert>
            </Snackbar>
        </PageWrapper>
    )
}

UserMakerPage.propTypes = {
    title: PropTypes.string
}

export default UserMakerPage