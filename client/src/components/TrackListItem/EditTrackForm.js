import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { Cancel, Done } from '@material-ui/icons';
import { withTheme } from '@material-ui/core/styles';

const form = reduxForm({
  form: 'editTrackForm'
});

const renderField = ({
  input,
  label,
  meta: { pristine, touched, error },
  children,
  ...custom
}) => <TextField label={label} {...input} {...custom} />;

class EditTrackForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        title: props.track.title,
        artist: props.track.artist,
        album: props.track.album
      }
    };
  }

  render() {
    const {
      track,
      handleSubmit,
      handleEditTrackData,
      handleToggleEditMode,
      theme
    } = this.props;
    console.log('form:', form.fields);
    const styles = {
      save: {
        color: theme.palette.context.success
      },
      cancel: {
        color: theme.palette.context.danger
      }
    };

    return (
      <form
        style={{ width: '100%' }}
        onSubmit={handleSubmit(formData => {
          handleEditTrackData(formData, track);
          handleToggleEditMode();
        })}
      >
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Field
              type="text"
              name="title"
              autoFocus
              component={renderField}
              label="Track title"
              placeholder={track.title}
            />
            <Field
              type="text"
              name="artist"
              component={renderField}
              label="Artist"
              placeholder={track.artist.name}
            />
            <Field
              type="text"
              name="album"
              component={renderField}
              label="Album"
              placeholder={track.album.title}
            />
          </Grid>
          <Grid item xs={6}>
            <Grid container justify="flex-end">
              <IconButton title="Save changes" type="submit">
                <Done style={styles.save} />
              </IconButton>
              <IconButton title="Cancel" onClick={handleToggleEditMode}>
                <Cancel style={styles.cancel} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default withTheme(form(EditTrackForm));
