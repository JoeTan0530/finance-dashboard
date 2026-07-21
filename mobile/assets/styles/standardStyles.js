import { StyleSheet } from 'react-native';

const standardRoot = {
	themeColor: {
		primaryColor: '#F5F9FF',
		secondaryColor: '#FFFFFF',
		tertiaryColor: '#2563EB',
		errorColor: '#c51017',
		warningColor: '#ffe139',
		successColor: '#4dff2c',
		hyperlinkTextColor: '#2563EB',
	},

	pageColor: {
		primaryBgColor: '#F5F9FF',
		secondaryBgColor: '#FFFFFF',
		primaryTextColor: '#000000',
		secondaryTextColor: '#64748B',
		tertiaryTextColor: '',
		fourthTextColor: '',
		onhoverTextColor: '#000',
		xlTextSize: 48,
		lgTextSize: 28,
		mdTextSize: 20,
		smTextSize: 15,
		ssmTextSize: 14,
		xsTextSize: 13,
	},

	fontWeight: {
		thin: '300',
		thick: '500',
		bold: '700',
		max: '900',
	},

	button: {
		primaryBgColor: '#2563EB',
		secondaryBgColor: '#FFFFFF',
		tertiaryBgColor: '',
		logoutBgColor: 'transparent',
		passwordEyeBgColor: 'transparent',
		disabledBgColor: '#d3d3d3',
		onHoverPrimaryBgColor: '#1D4ED8',
		onHoverSecondaryBgColor: '#EFF6FF',
		onHoverTertiaryBgColor: '',
		onHoverLogoutBgColor: '#E3EFFF',
		onHoverPasswordEyeBgColor: '#E3EFFF',
		primaryTextColor: '#ffffff',
		secondaryTextColor: '#000000',
		tertiaryTextColor: '#000',
		logoutTextColor: '#000',
		passwordEyeTextColor: '#000',
		disabledTextColor: '',
		onHoverPrimaryTextColor: '#FFFFFF',
		onHoverSecondaryTextColor: '#000000',
		onHoverTertiaryTextColor: '#000',
		onHoverLogoutTextColor: '#000',
		onHoverPasswordEyeTextColor: '#000',
		widthLong: 170,
		widthShort: 130,
		borderRadius: 10,
		borderWidth: 0, // Changed from 'none' to 0
		borderColor: 'transparent',
		borderStyle: 'solid',
		logoutBorderWidth: 0, // Changed from 'none'
		logoutBorderColor: 'transparent',
		logoutBorderRadius: 10,
		passwordEyeBorderWidth: 0,
		passwordEyeBorderColor: 'transparent',
		passwordEyeBorderRadius: 10,
	},

	formContainer: {
		bg: '#FFFFFF',
		borderRadius: 10,
		borderWidth: 0,
		borderColor: 'transparent',
		borderStyle: 'solid',
		// React Native uses elevation or shadow props instead of box-shadow
		elevation: 3, // Android shadow
		shadowColor: 'rgba(0,0,0,0.5)',
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 6,
		shadowOpacity: 0.5,
	},

	input: {
		labelSize: 15,
		textSize: 15,
		borderRadius: 7,
		borderWidth: 1,
		borderColor: '#E2E8F0',
		borderStyle: 'solid',
		bgColor: 'transparent',
		widthLong: '100%',
		widthShort: '',
		placeholderSize: 15,
		placeholderColor: '#64748B',
		onFocusBorderColor: '',
		disabledBgColor: '#e4e6e9',
	},

	header: {
		bgColor: '#ffffff',
		textSize: 15,
		textColor: '#000000',
		borderWidth: 1,
		borderColor: '#DBEAFE',
		borderStyle: 'solid',
		elevation: 0,
		shadowColor: 'transparent',
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 0,
		shadowOpacity: 0,
		menuOnHoverColor: '#EFF6FF',
		menuOnActiveColor: '#000000',
		menuOnActiveBorderWidth: 3,
		menuOnActiveBorderColor: '#2563EB',
		menuOnActiveBorderStyle: 'solid',
		menuDropdownTextColor: '#8b93a4',
	},

	sidebar: {
		bgColor: '#FFFFFF',
		width: '80%',
		textSize: 15,
		textColor: '#000000',
		btnOnHoverColor: '#EFF6FF',
	},

	footer: {
		bgColor: '',
		borderWidth: 0,
		borderColor: 'transparent',
		borderStyle: 'solid',
		textSize: 13,
		textColor: '#000000',
		onHoverColor: '',
		labelColor: '',
	},

	systemPopup: {
		bgColor: '#FFFFFF',
		bgColorWarning: '#F2E6AC',
		bgColorError: '#F7ABAB',
		borderWidth: 1,
		borderColor: '#DBEAFE',
		borderStyle: 'solid',
		borderColorWarning: '#FCEB56',
		borderColorError: '#F74848',
		borderRadius: 7,
		elevation: 5,
		shadowColor: 'rgba(0,0,0,0.60)',
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 9,
		shadowOpacity: 0.6,
		warningElevation: 5,
		warningShadowColor: 'rgba(242,230,172,0.60)',
		warningShadowOffset: { width: 0, height: 0 },
		warningShadowRadius: 9,
		warningShadowOpacity: 0.6,
		errorElevation: 5,
		errorShadowColor: 'rgba(247,72,72,0.60)',
		errorShadowOffset: { width: 0, height: 0 },
		errorShadowRadius: 9,
		errorShadowOpacity: 0.6,
	},

	table: {
		headerBg: '#EFF6FF',
		headerBorderWidth: 1,
		headerBorderColor: '#93C5FD',
		headerBorderStyle: 'solid',
		headerFontSize: 20,
		headerFontColor: '#000000',
		headerFontWeight: '500',
		listingBgPrimary: 'transparent',
		listingBgSecondary: '#F8FAFC',
		listingBorderWidth: 1,
		listingBorderColor: '#DBEAFE',
		listingBorderStyle: 'solid',
		listingFontSize: 15,
		listingFontColor: '#000000',
		listingFontWeight: '300',
		listingBgOnHover: '#DBEAFE',
		listingBorderRadius: 10,
		elevation: 3,
		shadowColor: 'rgba(0,0,0,0.75)',
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 4,
		shadowOpacity: 0.75,
		listingOuterBorderRadius: 10,
		loadingComponentColor: '#000', // Changed from linear-gradient
	},

	progressBar: {
		limitBarBgColor: '#D9D9D9',
		limitBarHeight: 10,
		limitBarBorderWidth: 0,
		limitBarBorderColor: 'transparent',
		limitBarBorderStyle: 'solid',
		limitBarBorderRadius: 20,
		progressDisplayBorderWidth: 0,
		progressDisplayBorderColor: 'transparent',
		progressDisplayBorderStyle: 'solid',
		progressDisplayBorderRadius: 20,
		progressDisplayDefaultColor: '#2563EB',
	},
};

const standardStyles = StyleSheet.create({
	// Root styles
	root: {
		height: '100%',
	},

	body: {
		display: 'flex',
		height: '100%',
	},

	mainDisplay: {
		height: '100%',
	},

	rowFullPageRow: {
		marginLeft: 'auto',
		marginRight: 'auto',
	},

	contentDisplayContainer: {
		minHeight: '90%',
		paddingVertical: 32,
		paddingHorizontal: 0,
	},

	maxContentWidth: {
		width: 'auto',
	},

	// ============================================
	// BUTTON STYLES
	// ============================================
	btn: {
		width: standardRoot.button.widthShort,
		paddingVertical: 8,
		paddingHorizontal: 8,
		fontSize: standardRoot.pageColor.smTextSize,
		fontWeight: standardRoot.fontWeight.thick,
		borderRadius: standardRoot.button.borderRadius,
		borderWidth: standardRoot.button.borderWidth,
		borderColor: standardRoot.button.borderColor,
		borderStyle: standardRoot.button.borderStyle,
	},

	btnLong: {
		width: standardRoot.button.widthLong,
	},

	btnPrimary: {
		backgroundColor: standardRoot.button.primaryBgColor,
		color: standardRoot.button.primaryTextColor,
		borderWidth: 0,
		borderColor: 'transparent',
	},

	btnPrimaryHover: {
		backgroundColor: standardRoot.button.onHoverPrimaryBgColor,
		color: standardRoot.button.onHoverPrimaryTextColor,
	},

	btnSecondary: {
		backgroundColor: standardRoot.button.secondaryBgColor,
		color: standardRoot.button.secondaryTextColor,
		borderWidth: 1,
		borderColor: '#E2E8F0',
		borderStyle: 'solid',
	},

	btnSecondaryHover: {
		backgroundColor: standardRoot.button.onHoverSecondaryBgColor,
		color: standardRoot.button.onHoverSecondaryTextColor,
	},

	btnTertiary: {
		backgroundColor: standardRoot.button.tertiaryBgColor,
		color: standardRoot.button.tertiaryTextColor,
		paddingVertical: 1.6,
		paddingHorizontal: 4.8,
		borderWidth: 0,
		borderColor: 'transparent',
		textDecorationLine: 'underline',
		width: 'auto',
	},

	btnTertiaryHover: {
		backgroundColor: standardRoot.button.onHoverTertiaryBgColor,
		color: standardRoot.button.onHoverTertiaryTextColor,
		textDecorationLine: 'none',
	},

	btnHyperlink: {
		color: standardRoot.themeColor.hyperlinkTextColor,
		backgroundColor: standardRoot.button.tertiaryBgColor,
		paddingVertical: 1.6,
		paddingHorizontal: 0,
		borderWidth: 0,
		borderColor: 'transparent',
		textDecorationLine: 'underline',
		width: 'auto',
	},

	btnIcon: {
		fontSize: 15,
		marginRight: 4.8,
	},

	// ============================================
	// FORM CONTAINER STYLES
	// ============================================
	formContainer: {
		backgroundColor: standardRoot.formContainer.bg,
		padding: 16,
		borderRadius: standardRoot.formContainer.borderRadius,
		borderWidth: standardRoot.formContainer.borderWidth,
		borderColor: standardRoot.formContainer.borderColor,
		borderStyle: standardRoot.formContainer.borderStyle,
		elevation: standardRoot.formContainer.elevation,
		shadowColor: standardRoot.formContainer.shadowColor,
		shadowOffset: standardRoot.formContainer.shadowOffset,
		shadowRadius: standardRoot.formContainer.shadowRadius,
		shadowOpacity: standardRoot.formContainer.shadowOpacity,
	},

	formGroup: {
		position: 'relative',
		marginBottom: 16,
	},

	formLabel: {
		color: standardRoot.pageColor.primaryTextColor,
		fontSize: standardRoot.input.labelSize,
		fontWeight: standardRoot.fontWeight.thick,
	},

	requiredAsterisk: {
		color: standardRoot.themeColor.errorColor,
	},

	formControl: {
		backgroundColor: standardRoot.input.bgColor,
		borderWidth: standardRoot.input.borderWidth,
		borderColor: standardRoot.input.borderColor,
		borderStyle: standardRoot.input.borderStyle,
		borderRadius: standardRoot.input.borderRadius,
		width: standardRoot.input.widthLong,
		fontSize: standardRoot.input.textSize,
		fontWeight: standardRoot.fontWeight.thin,
		color: standardRoot.pageColor.primaryTextColor,
		padding: 8,
	},

	formControlDisabled: {
		backgroundColor: standardRoot.input.disabledBgColor,
	},

	formSelect: {
		borderWidth: standardRoot.input.borderWidth,
		borderColor: standardRoot.input.borderColor,
		borderStyle: standardRoot.input.borderStyle,
		borderRadius: standardRoot.input.borderRadius,
		width: standardRoot.input.widthLong,
		fontSize: standardRoot.input.textSize,
		fontWeight: standardRoot.fontWeight.thin,
		color: standardRoot.pageColor.primaryTextColor,
		padding: 8,
		paddingRight: 32,
	},

	formPasswordContainer: {
		position: 'relative',
	},

	formPasswordContainerFormControl: {
		paddingRight: 32,
	},

	formPasswordAnchor: {
		position: 'absolute',
		top: 52,
		right: 20,
		color: standardRoot.button.passwordEyeTextColor,
		textDecorationLine: 'none',
		backgroundColor: standardRoot.button.passwordEyeBgColor,
		borderWidth: standardRoot.button.passwordEyeBorderWidth,
		borderColor: standardRoot.button.passwordEyeBorderColor,
		borderRadius: standardRoot.button.passwordEyeBorderRadius,
	},

	formPasswordAnchorHover: {
		backgroundColor: standardRoot.button.onHoverPasswordEyeBgColor,
		color: standardRoot.button.onHoverPasswordEyeTextColor,
	},

	formPasswordAnchorIcon: {
		padding: 12.8,
	},

	redirectAnchor: {
		color: standardRoot.themeColor.hyperlinkTextColor,
		textDecorationLine: 'underline',
		fontSize: standardRoot.pageColor.smTextSize,
	},

	formGroupInputGroupFormControl: {
		width: 'auto',
	},

	errorMsg: {
		color: standardRoot.themeColor.errorColor,
		fontSize: standardRoot.pageColor.xsTextSize,
		fontWeight: standardRoot.fontWeight.thin,
	},

	formDateRangeContainer: {
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
	},

	formDateRangeDivider: {
		fontSize: 20,
		fontWeight: standardRoot.fontWeight.thin,
		color: standardRoot.pageColor.primaryTextColor,
		paddingHorizontal: 8,
	},

	dateRangePickerContainer: {
		position: 'absolute',
		zIndex: 1000,
		backgroundColor: standardRoot.pageColor.primaryBgColor,
		elevation: 5,
		shadowColor: 'rgba(0, 0, 0, 0.75)',
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 7,
		shadowOpacity: 0.75,
		borderRadius: standardRoot.input.borderRadius,
		padding: 4.8,
		top: -149,
		width: 'auto',
		display: 'flex',
		flexDirection: 'column',
	},

	formDateRangeInnerContainer: {
		position: 'relative',
		display: 'inline-block',
	},

	formDateRangeIcon: {
		position: 'absolute',
		width: 17,
		height: 'auto',
		top: 21,
		right: 17,
	},

	formDateRangeInnerContainerFormControl: {
		paddingRight: 32,
	},

	formCheck: {
		paddingVertical: 8,
		margin: 0,
		color: standardRoot.pageColor.primaryTextColor,
	},

	formSelectControlMinHeight: {
		minHeight: 'auto',
	},

	// ============================================
	// PAGE CONTENT STYLES
	// ============================================
	pageContentContainer: {
		padding: 32,
		paddingLeft: 0,
		paddingRight: 0,
		backgroundColor: standardRoot.pageColor.primaryBgColor,
		minHeight: '100%',
		display: 'flex',
	},

	loginPageContainer: {
		paddingTop: 80,
	},

	pageContentTitle: {
		fontSize: standardRoot.pageColor.mdTextSize,
		fontWeight: standardRoot.fontWeight.bold,
		color: standardRoot.pageColor.primaryTextColor,
	},

	fontSizeXl: {
		fontSize: standardRoot.pageColor.xlTextSize,
	},

	fontSizeLg: {
		fontSize: standardRoot.pageColor.lgTextSize,
	},

	fontSizeMd: {
		fontSize: standardRoot.pageColor.mdTextSize,
	},

	fontSizeSm: {
		fontSize: standardRoot.pageColor.smTextSize,
	},

	fontSizeSsm: {
		fontSize: standardRoot.pageColor.ssmTextSize,
	},

	fontSizeXs: {
		fontSize: standardRoot.pageColor.xsTextSize,
	},

	fontWeightThin: {
		fontWeight: standardRoot.fontWeight.thin,
	},

	fontWeightThick: {
		fontWeight: standardRoot.fontWeight.thick,
	},

	fontWeightBold: {
		fontWeight: standardRoot.fontWeight.bold,
	},

	fontWeightMax: {
		fontWeight: standardRoot.fontWeight.max,
	},

	primaryTextColor: {
		color: standardRoot.pageColor.primaryTextColor,
	},

	secondaryTextColor: {
		color: standardRoot.pageColor.secondaryTextColor,
	},

	logoIcon: {
		fontSize: 80,
		color: '#000000',
	},

	pageTitle: {
		fontSize: standardRoot.pageColor.lgTextSize,
		color: standardRoot.pageColor.primaryTextColor,
		fontWeight: standardRoot.fontWeight.bold,
	},

	pageSubTitle: {
		fontSize: standardRoot.pageColor.mdTextSize,
		color: standardRoot.pageColor.secondaryTextColor,
		fontWeight: standardRoot.fontWeight.thick,
	},

	// ============================================
	// HEADER STYLES
	// ============================================
	headerOuterRow: {
		backgroundColor: standardRoot.header.bgColor,
		borderBottomWidth: standardRoot.header.borderWidth,
		borderBottomColor: standardRoot.header.borderColor,
		borderBottomStyle: standardRoot.header.borderStyle,
	},

	headerContainer: {
		paddingVertical: 16,
		paddingHorizontal: 0,
	},

	headerBrandContainer: {
		fontSize: 0,
		marginRight: 0,
	},

	headerLogoAnchor: {
		textDecorationLine: 'none',
	},

	headerLogoIcon: {
		fontSize: 25,
		color: standardRoot.pageColor.primaryTextColor,
	},

	headerLogoText: {
		fontSize: standardRoot.pageColor.mdTextSize,
		fontWeight: standardRoot.fontWeight.max,
		color: standardRoot.header.textColor,
	},

	headerDropdownContainer: {
		position: 'relative',
	},

	headerDropdownListContainer: {
		zIndex: 100,
		position: 'absolute',
		right: 0,
		bottom: 0,
	},

	headerDropdownList: {
		padding: 8,
		backgroundColor: standardRoot.header.bgColor,
		borderWidth: standardRoot.header.borderWidth,
		borderColor: standardRoot.header.borderColor,
		borderStyle: standardRoot.header.borderStyle,
	},

	headerDropdownItem: {
		color: standardRoot.header.textColor,
		fontWeight: standardRoot.fontWeight.thick,
		display: 'flex',
		marginBottom: 4.8,
		textDecorationLine: 'none',
		paddingVertical: 3.2,
		paddingHorizontal: 8,
	},

	headerDropdownItemLast: {
		marginBottom: 0,
	},

	headerDropdownItemHover: {
		borderRadius: 3,
		backgroundColor: standardRoot.header.menuOnHoverColor,
	},

	headerDropdownItemLogout: {
		display: 'flex',
		alignItems: 'center',
		color: standardRoot.themeColor.errorColor,
	},

	headerDropdownBtn: {
		color: standardRoot.header.textColor,
		paddingVertical: 8,
		paddingHorizontal: 4.8,
		borderRadius: standardRoot.button.borderRadius,
	},

	headerBtn: {
		color: standardRoot.header.textColor,
		paddingVertical: 8,
		paddingHorizontal: 4.8,
		borderRadius: standardRoot.button.borderRadius,
		textDecorationLine: 'none',
		fontWeight: standardRoot.fontWeight.thick,
		marginRight: 8,
	},

	headerDropdownBtnHover: {
		borderRadius: 3,
		backgroundColor: standardRoot.header.menuOnHoverColor,
	},

	headerBtnHover: {
		fontWeight: standardRoot.fontWeight.bold,
	},

	headerBtnSidebar: {
		paddingVertical: 8,
		paddingHorizontal: 8,
	},

	headerBtnLogout: {
		backgroundColor: standardRoot.button.logoutBgColor,
		borderWidth: standardRoot.button.logoutBorderWidth,
		borderColor: standardRoot.button.logoutBorderColor,
		borderRadius: standardRoot.button.logoutBorderRadius,
	},

	headerBtnLogoutHover: {
		backgroundColor: standardRoot.button.onHoverLogoutBgColor,
	},

	headerBtnSidebarButton: {
		backgroundColor: 'transparent',
		borderWidth: 0,
		lineHeight: 1,
	},

	headerIcon: {
		fontSize: 20,
	},

	headerDropdownBtnHoverIcon: {
		fontSize: 21,
	},

	// ============================================
	// SIDEBAR STYLES
	// ============================================
	sidebarContainer: {
		position: 'fixed',
		width: '100%',
		height: '100%',
		display: 'flex',
		zIndex: 1000,
	},

	sidebarContainerClosed: {
		display: 'none',
	},

	sidebarBackground: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'flex-start',
	},

	sidebarDisplay: {
		backgroundColor: standardRoot.sidebar.bgColor,
		width: standardRoot.sidebar.width,
		height: '100%',
		maxHeight: '100%',
	},

	sidebarList: {
		padding: 32,
	},

	sidebarBtn: {
		color: standardRoot.sidebar.textColor,
		fontSize: standardRoot.sidebar.textSize,
		display: 'flex',
		marginBottom: 6.4,
		textDecorationLine: 'none',
	},

	sidebarBtnHover: {
		textDecorationLine: 'underline',
		backgroundColor: standardRoot.sidebar.btnOnHoverColor,
	},

	sidebarBtnBack: {
		backgroundColor: 'transparent',
		borderWidth: 0,
		paddingVertical: 4,
		paddingHorizontal: 8,
		lineHeight: 1.2,
		borderRadius: 6,
		textAlign: 'left',
	},

	sidebarBtnBackHover: {
		backgroundColor: standardRoot.sidebar.btnOnHoverColor,
	},

	sidebarBtnLast: {
		marginBottom: 0,
	},

	sidebarDropdownContainerSidebarBtnHover: {
		textDecorationLine: 'none',
	},

	sidebarDropdownContainerSidebarBtnSpan: {
		marginRight: 1.6,
	},

	sidebarDropdownListSidebarBtn: {
		paddingLeft: 8,
		marginBottom: 4.8,
	},

	sidebarDropdownListSidebarBtnLogout: {
		display: 'flex',
		alignItems: 'center',
		color: standardRoot.themeColor.errorColor,
	},

	sidebarDropdownIcon: {
		fontSize: 10,
	},

	sidebarCloseBtn: {
		display: 'inline-block',
		backgroundColor: 'transparent',
		borderWidth: 0,
		paddingVertical: 4,
		paddingHorizontal: 8,
		lineHeight: 1,
		borderRadius: 6,
	},

	sidebarCloseBtnHover: {
		backgroundColor: standardRoot.sidebar.btnOnHoverColor,
	},

	sidebarCloseBtnIcon: {
		fontSize: 25,
		color: '#000000',
	},

	// ============================================
	// FOOTER STYLES
	// ============================================
	footerText: {
		fontSize: standardRoot.footer.textSize,
		color: standardRoot.footer.textColor,
		textAlign: 'center',
	},

	// ============================================
	// SYSTEM POPUP STYLES
	// ============================================
	customPopupContainer: {
		position: 'fixed',
		zIndex: 1000,
	},

	customPopupContainerTopRight: {
		top: '5%',
		right: '3%',
	},

	customPopupContainerTopLeft: {
		top: '5%',
		left: '3%',
	},

	customPopupContainerBottomRight: {
		bottom: '5%',
		right: '3%',
	},

	customPopupContainerBottomLeft: {
		bottom: '5%',
		left: '3%',
	},

	customPopupDisplay: {
		display: 'flex',
		backgroundColor: standardRoot.systemPopup.bgColor,
		borderWidth: standardRoot.systemPopup.borderWidth,
		borderColor: standardRoot.systemPopup.borderColor,
		borderStyle: standardRoot.systemPopup.borderStyle,
		borderRadius: standardRoot.systemPopup.borderRadius,
		elevation: standardRoot.systemPopup.elevation,
		shadowColor: standardRoot.systemPopup.shadowColor,
		shadowOffset: standardRoot.systemPopup.shadowOffset,
		shadowRadius: standardRoot.systemPopup.shadowRadius,
		shadowOpacity: standardRoot.systemPopup.shadowOpacity,
		paddingVertical: 8,
		paddingHorizontal: 11.2,
		minWidth: 300,
		maxWidth: 500,
	},

	customPopupDisplayWarning: {
		backgroundColor: standardRoot.systemPopup.bgColorWarning,
		borderColor: standardRoot.systemPopup.borderColorWarning,
		elevation: standardRoot.systemPopup.warningElevation,
		shadowColor: standardRoot.systemPopup.warningShadowColor,
		shadowOffset: standardRoot.systemPopup.warningShadowOffset,
		shadowRadius: standardRoot.systemPopup.warningShadowRadius,
		shadowOpacity: standardRoot.systemPopup.warningShadowOpacity,
	},

	customPopupDisplayError: {
		backgroundColor: standardRoot.systemPopup.bgColorError,
		borderColor: standardRoot.systemPopup.borderColorError,
		elevation: standardRoot.systemPopup.errorElevation,
		shadowColor: standardRoot.systemPopup.errorShadowColor,
		shadowOffset: standardRoot.systemPopup.errorShadowOffset,
		shadowRadius: standardRoot.systemPopup.errorShadowRadius,
		shadowOpacity: standardRoot.systemPopup.errorShadowOpacity,
	},

	customPopupDisplayText: {
		color: standardRoot.pageColor.primaryTextColor,
		fontSize: standardRoot.pageColor.smTextSize,
		fontWeight: standardRoot.fontWeight.thick,
		whiteSpace: 'pre-line',
		textAlign: 'left',
	},

	// ============================================
	// TABLE STYLES
	// ============================================
	listingTableContainer: {
		maxWidth: '100%',
		overflowX: 'auto',
		elevation: standardRoot.table.elevation,
		shadowColor: standardRoot.table.shadowColor,
		shadowOffset: standardRoot.table.shadowOffset,
		shadowRadius: standardRoot.table.shadowRadius,
		shadowOpacity: standardRoot.table.shadowOpacity,
		borderRadius: standardRoot.table.listingOuterBorderRadius,
	},

	listingTableNoDataContainer: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		paddingVertical: 112,
		paddingHorizontal: 0,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: standardRoot.table.listingOuterBorderRadius,
	},

	listingTableNoDataIcon: {
		fontSize: 80,
		color: standardRoot.pageColor.secondaryTextColor,
		marginBottom: 16,
	},

	listingTable: {
		backgroundColor: 'transparent',
		marginBottom: 0,
	},

	listingTableHeader: {
		backgroundColor: standardRoot.table.headerBg,
		borderBottomWidth: standardRoot.table.headerBorderWidth,
		borderBottomColor: standardRoot.table.headerBorderColor,
		borderBottomStyle: standardRoot.table.headerBorderStyle,
		fontSize: standardRoot.table.headerFontSize,
		color: standardRoot.table.headerFontColor,
		fontWeight: standardRoot.table.headerFontWeight,
		padding: 8,
		minWidth: 80,
	},

	listingTableHeaderFirst: {
		borderTopLeftRadius: standardRoot.table.listingBorderRadius,
	},

	listingTableHeaderLast: {
		borderTopRightRadius: standardRoot.table.listingBorderRadius,
	},

	listingTableCell: {
		backgroundColor: standardRoot.table.listingBgPrimary,
		borderBottomWidth: standardRoot.table.listingBorderWidth,
		borderBottomColor: standardRoot.table.listingBorderColor,
		borderBottomStyle: standardRoot.table.listingBorderStyle,
		fontSize: standardRoot.table.listingFontSize,
		color: standardRoot.table.listingFontColor,
		fontWeight: standardRoot.table.listingFontWeight,
		padding: 8,
	},

	listingTableCellEven: {
		backgroundColor: standardRoot.table.listingBgSecondary,
	},

	listingTableCellHover: {
		backgroundColor: standardRoot.table.listingBgOnHover,
	},

	listingTableCellLastFirst: {
		borderBottomLeftRadius: standardRoot.table.listingBorderRadius,
	},

	listingTableCellLastLast: {
		borderBottomRightRadius: standardRoot.table.listingBorderRadius,
	},

	listingTableCellLast: {
		borderBottomWidth: 0,
	},

	tableComponentLoader: {
		width: 45,
		aspectRatio: 1,
		backgroundColor: standardRoot.table.loadingComponentColor,
	},

	// ============================================
	// TEXT UTILITIES
	// ============================================
	textEllipsis1: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},

	// ============================================
	// PAGINATION STYLES
	// ============================================
	pageLink: {
		backgroundColor: 'transparent',
		borderWidth: 0,
		borderColor: 'transparent',
		color: standardRoot.pageColor.primaryTextColor,
	},

	pageLinkHover: {
		color: standardRoot.themeColor.hyperlinkTextColor,
	},

	pageLinkActive: {
		color: standardRoot.themeColor.hyperlinkTextColor,
	},

	paginationEllipsisPageLinkHover: {
		color: standardRoot.pageColor.primaryTextColor,
	},

	// ============================================
	// RATING STYLES
	// ============================================
	customRatingContainer: {
		display: 'inline-block',
	},

	ratingStars: {
		display: 'flex',
		gap: 5,
	},

	ratingStar: {
		color: '#ffc107',
		fontSize: 24,
	},

	ratingText: {
		marginTop: 5,
		fontSize: 14,
		color: '#666',
	},

	// ============================================
	// PROGRESS BAR STYLES
	// ============================================
	progressBarContainer: {
		width: '100%',
	},

	progressBarLimitContainer: {
		backgroundColor: standardRoot.progressBar.limitBarBgColor,
		width: '100%',
		height: standardRoot.progressBar.limitBarHeight,
		borderWidth: standardRoot.progressBar.limitBarBorderWidth,
		borderColor: standardRoot.progressBar.limitBarBorderColor,
		borderStyle: standardRoot.progressBar.limitBarBorderStyle,
		borderRadius: standardRoot.progressBar.limitBarBorderRadius,
		padding: 0,
		position: 'relative',
	},

	progressDisplay: {
		width: 0,
		height: '100%',
		borderWidth: standardRoot.progressBar.progressDisplayBorderWidth,
		borderColor: standardRoot.progressBar.progressDisplayBorderColor,
		borderStyle: standardRoot.progressBar.progressDisplayBorderStyle,
		borderRadius: standardRoot.progressBar.progressDisplayBorderRadius,
		backgroundColor: standardRoot.progressBar.progressDisplayDefaultColor,
	},

	progressNumDisplay: {
		position: 'absolute',
		right: '50%',
		top: '50%',
		color: standardRoot.pageColor.primaryTextColor,
		fontWeight: standardRoot.fontWeight.thick,
		fontSize: standardRoot.pageColor.smTextSize,
	},

	progressBarLimitContainerWithNum: {
		height: 25,
	},
});

export default standardStyles;