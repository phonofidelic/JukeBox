import React, { Component } from 'react';
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Typography,	
} from '@material-ui/core';

const DUMMY_TEXT = `Lorem ipsum dolor sit amet, putent sadipscing id qui, vel ubique propriae contentiones ex, mel in nulla option. Eam ut mutat iuvaret, nihil saperet theophrastus sit ne, nulla zril euismod qui cu. Vel id indoctum conceptam rationibus. Prompta civibus eu eos. Purto ignota contentiones vel ne, numquam aliquid an vix, persius menandri delicatissimi mel an. Mea ne debet molestiae assentior, regione tibique antiopam no qui.
No vivendum voluptaria cum. Vis mucius intellegat ad, erat rationibus quo no, purto augue dolore ne quo. Scripta expetendis cum an, vero rebum interpretaris te eos. Wisi maiestatis his ad, sale scaevola salutatus in has. His ei numquam laboramus, te sea cetero persius, cum at alii adolescens.

Sed tollit dignissim an, cu eum affert tollit numquam, an mea feugait recusabo erroribus. Eam ei minim commodo, stet nullam ius no, quando oratio scribentur est ea. Ius doctus similique in, pri wisi nusquam signiferumque ea, docendi platonem no mea. In nec quidam deseruisse, vel ut erant posidonium. Has amet labores imperdiet id, fierent percipit tacimates an vel. Ius meis tibique at, inermis torquatos assentior in eam, sit denique propriae dissentiet an.

Quas oratio repudiandae cum ex, velit debet ad vel. Cu hinc audiam usu, cu usu tation veritus intellegam. Eu vix oporteat ocurreret, tollit legimus alienum nec an. Et quaeque admodum accusamus eos. Posse ancillae antiopam in sed, sit vero feugait signiferumque ei, mea debet laoreet et. Duo ullum vocibus definitiones et, veritus graecis minimum nec eu.

Ius feugait detraxit molestiae ut, in nam ocurreret neglegentur, ei placerat mediocritatem eam. Adhuc lobortis te qui, et ullum eleifend deseruisse usu. An vix eirmod sanctus epicurei, civibus ancillae torquatos nec at. Congue oratio facilis te quo, vim ea natum lorem offendit. Id magna gubergren adolescens sit, sed eu reque mentitum, case vidit mazim mel in.
Lorem ipsum dolor sit amet, putent sadipscing id qui, vel ubique propriae contentiones ex, mel in nulla option. Eam ut mutat iuvaret, nihil saperet theophrastus sit ne, nulla zril euismod qui cu. Vel id indoctum conceptam rationibus. Prompta civibus eu eos. Purto ignota contentiones vel ne, numquam aliquid an vix, persius menandri delicatissimi mel an. Mea ne debet molestiae assentior, regione tibique antiopam no qui.

No vivendum voluptaria cum. Vis mucius intellegat ad, erat rationibus quo no, purto augue dolore ne quo. Scripta expetendis cum an, vero rebum interpretaris te eos. Wisi maiestatis his ad, sale scaevola salutatus in has. His ei numquam laboramus, te sea cetero persius, cum at alii adolescens.

Sed tollit dignissim an, cu eum affert tollit numquam, an mea feugait recusabo erroribus. Eam ei minim commodo, stet nullam ius no, quando oratio scribentur est ea. Ius doctus similique in, pri wisi nusquam signiferumque ea, docendi platonem no mea. In nec quidam deseruisse, vel ut erant posidonium. Has amet labores imperdiet id, fierent percipit tacimates an vel. Ius meis tibique at, inermis torquatos assentior in eam, sit denique propriae dissentiet an.

Quas oratio repudiandae cum ex, velit debet ad vel. Cu hinc audiam usu, cu usu tation veritus intellegam. Eu vix oporteat ocurreret, tollit legimus alienum nec an. Et quaeque admodum accusamus eos. Posse ancillae antiopam in sed, sit vero feugait signiferumque ei, mea debet laoreet et. Duo ullum vocibus definitiones et, veritus graecis minimum nec eu.

Ius feugait detraxit molestiae ut, in nam ocurreret neglegentur, ei placerat mediocritatem eam. Adhuc lobortis te qui, et ullum eleifend deseruisse usu. An vix eirmod sanctus epicurei, civibus ancillae torquatos nec at. Congue oratio facilis te quo, vim ea natum lorem offendit. Id magna gubergren adolescens sit, sed eu reque mentitum, case vidit mazim mel in.
Lorem ipsum dolor sit amet, putent sadipscing id qui, vel ubique propriae contentiones ex, mel in nulla option. Eam ut mutat iuvaret, nihil saperet theophrastus sit ne, nulla zril euismod qui cu. Vel id indoctum conceptam rationibus. Prompta civibus eu eos. Purto ignota contentiones vel ne, numquam aliquid an vix, persius menandri delicatissimi mel an. Mea ne debet molestiae assentior, regione tibique antiopam no qui.

No vivendum voluptaria cum. Vis mucius intellegat ad, erat rationibus quo no, purto augue dolore ne quo. Scripta expetendis cum an, vero rebum interpretaris te eos. Wisi maiestatis his ad, sale scaevola salutatus in has. His ei numquam laboramus, te sea cetero persius, cum at alii adolescens.

Sed tollit dignissim an, cu eum affert tollit numquam, an mea feugait recusabo erroribus. Eam ei minim commodo, stet nullam ius no, quando oratio scribentur est ea. Ius doctus similique in, pri wisi nusquam signiferumque ea, docendi platonem no mea. In nec quidam deseruisse, vel ut erant posidonium. Has amet labores imperdiet id, fierent percipit tacimates an vel. Ius meis tibique at, inermis torquatos assentior in eam, sit denique propriae dissentiet an.

Quas oratio repudiandae cum ex, velit debet ad vel. Cu hinc audiam usu, cu usu tation veritus intellegam. Eu vix oporteat ocurreret, tollit legimus alienum nec an. Et quaeque admodum accusamus eos. Posse ancillae antiopam in sed, sit vero feugait signiferumque ei, mea debet laoreet et. Duo ullum vocibus definitiones et, veritus graecis minimum nec eu.

Ius feugait detraxit molestiae ut, in nam ocurreret neglegentur, ei placerat mediocritatem eam. Adhuc lobortis te qui, et ullum eleifend deseruisse usu. An vix eirmod sanctus epicurei, civibus ancillae torquatos nec at. Congue oratio facilis te quo, vim ea natum lorem offendit. Id magna gubergren adolescens sit, sed eu reque mentitum, case vidit mazim mel in.`;

class DetailCard extends Component {
	state = {
		// open: false
		isMobile: navigator.userAgent.indexOf('Mobile') > 0 ? true : false,
	}

	handleClose() {
		// this.setState({ open: false })
		this.props.handleCloseDetailView();
	}

	render() {
		const { detailViewData } = this.props;

		const { isMobile } = this.state;

		const imgWidth = isMobile ? window.innerWidth : 600;
		const imgHeight = isMobile ? window.innerWidth : 600;

		const PLACEHOLDER_IMAGE = `http://placekitten.com/${imgWidth}/${imgHeight}`;

		const styles = {
			root: {
				top: 0,
				// zIndex: 1,
			},
			cardMedia: {
				width: 600,
				height: 400,
				margin: 0,
			},

			dialog: {
				// width: '100%',
			},
			dialogContent: {
				padding: '0px',
			},
			dialogText: {
				paddingLeft: 24,
				paddingRight: 24,
			}
		}

		return (
			<div>
				<Dialog
					style={styles.dialog}
					fullScreen={isMobile}
					open={Boolean(detailViewData)}
					scroll="paper"
				>
					{	detailViewData &&
						<DialogContent style={styles.dialogContent}>
							<div>
								<img 
									src={detailViewData.imgSrc !== 'defaultImage' ? detailViewData.imgSrc : PLACEHOLDER_IMAGE} 
									width={imgWidth}
									height={imgHeight}
								/>
							</div>
							<DialogTitle>
								{ detailViewData.name || detailViewData.title }
							</DialogTitle>
							<DialogContentText style={styles.dialogText}>
								{ detailViewData.description }
							</DialogContentText>
						</DialogContent>
					}
					<DialogActions>
						<Button>
							More info
						</Button>
						<Button onClick={() => this.handleClose()}>
							Close
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default DetailCard;
